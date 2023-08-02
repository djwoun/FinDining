#include <stdio.h>
#include <iostream>
#include <fstream>
#include <map>
#include <set>
#include <vector>


using namespace std;

class Location {
	public:
		string name;
		string location;
		bool mp;
		char b;
		char l;
		char d;
};

void all_locations(map<string, vector<string> > sbb) {
	map<string, vector<string> >::iterator sit;
	vector<string> tmp;
	size_t i;
	
	cout << endl << "Sort by buildings: \n";
	for (sit = sbb.begin(); sit != sbb.end(); ++sit) {
		tmp = sit->second;
		cout << sit->first;
		cout << ": " << tmp[0];
		for (i = 1; i < tmp.size(); ++i) {
			cout << ", " << tmp[i];
		}
		cout << endl;
	}
}

void swipes(set<Location *> locs, char time) {
	set<Location *>::iterator lit;

	if (time == 'b') cout << "Breakfast: \n";
	else if (time == 'l') cout << "Lunch: \n";
	else if (time == 'd') cout << "Dinner: \n";

	for (lit = locs.begin(); lit != locs.end(); ++lit) {
		if (time == 'b' && (*lit)->b == 'y') {
			cout << (*lit)->name << " @ " << (*lit)->location << endl;
		} else if (time == 'l' && (*lit)->l == 'y') {
			cout << (*lit)->name << " @ " << (*lit)->location << endl;
		} else if (time ==  'd' && (*lit)->d == 'y') {
			cout << (*lit)->name << " @ " << (*lit)->location << endl;
		}
	}
}

int main() {
	// All locations
	set<Location *> locs;
	set<Location *>::iterator lit;

	// Sort by Building
	map<string, vector<string> > sbb;
	map<string, vector<string> >::iterator sit;

	Location *x;
	
	ifstream fp;
	vector<string> tmp;
	string is;
	string new_l;
	char style;
	size_t i, j;

	fp.open("locations.txt");
	if (!fp.is_open()) {
		fprintf(stderr, "Can't open file\n");
		return 1;
	}

	do {
		fp.clear();
		is.clear();
		new_l.clear();
		j = 1000;

		getline(fp, is);
		if (fp.eof()) break;

		x = new Location;

		for (i = 0; i < is.size(); ++i) {
			if (is[i] == '@') {
				j = i+1;
				break;
			}
			new_l.push_back(is[i]);
		}
		x->name = new_l;
		new_l.clear();

		for (i = j; i < is.size(); ++i) {
			if (is[i] == '[') {
				j = i+1;
				break;
			}
			new_l.push_back(is[i]);
		}
		x->location = new_l;
		new_l.clear();

		x->b = is[j];
		x->l = is[j+1];
		x->d = is[j+2];
		if (x->b == 'n' && x->l == 'n' && x->d == 'n') {
			x->mp = 0;
		} else {
			x->mp = 1;
		}
		
		locs.insert(x);

	} while (!fp.eof());
	fp.close();

	for (lit = locs.begin(); lit != locs.end(); ++lit) {
		sit = sbb.find((*lit)->location);
		if (sit == sbb.end()) {
			tmp.clear();
			tmp.push_back((*lit)->name);
			sbb.insert(make_pair((*lit)->location, tmp));
		} else {
			sit->second.push_back((*lit)->name);
		}
	}

	cout << "All locations read. How would you like to view locations?\n";
	cout << " - a: Locations\n";
	cout << " - b: Breakfast Swipes\n";
	cout << " - l: Lunch Swipes\n";
	cout << " - d: Dinner Swipes\n";
	cin >> style;

	if (style == 'a') {
		all_locations(sbb);
	} else if (style == 'b') {
		swipes(locs, 'b');
	} else if (style == 'l') {
		swipes(locs, 'l');
	} else if (style == 'd') {
		swipes(locs, 'd');
	} else {
		cout << "Unknown command\n";
	}
	return 0;
}
