#include <stdio.h>
#include <iostream>
#include <fstream>
#include <set>
#include <vector>

#include "nlohmann/json.hpp"

using namespace std;
using nlohmann::json;

class Location {
	public:
		string name;
		string location;
		bool mp;
		char b;
		char l;
		char d;
		int M[2];
		int T[2];
		int W[2];
		int H[2];
		int F[2];
		int S[2];
		int s[2];
};

int main() {
	// All locations
	set<Location *> locs;
	set<Location *>::iterator lit;

	Location *x;
	
	ifstream fp;
	vector<string> tmp;
	string is;
	string new_l, sopen, sclose;
	int iopen, iclose;
	size_t i, j;
	json js;

	// Open text file
	fp.open("locations.txt");
	if (!fp.is_open()) {
		fprintf(stderr, "Can't open file\n");
		return 1;
	}

	// Read in all locations and create class for them.
	do {
		fp.clear();
		is.clear();
		new_l.clear();
		j = 1000;

		getline(fp, is);
		if (fp.eof()) break;

		x = new Location;

		// Get the name.
		for (i = 0; i < is.size(); ++i) {
			if (is[i] == '@') {
				j = i+1;
				break;
			}
			new_l.push_back(is[i]);
		}
		x->name = new_l;
		new_l.clear();

		// Get the location (Building)
		for (i = j; i < is.size(); ++i) {
			if (is[i] == '[') {
				j = i+1;
				break;
			}
			new_l.push_back(is[i]);
		}
		x->location = new_l;
		new_l.clear();

		// Get swipe information
		x->b = is[j];
		x->l = is[j+1];
		x->d = is[j+2];
		if (x->b == 'n' && x->l == 'n' && x->d == 'n') {
			x->mp = 0;
		} else {
			x->mp = 1;
		}

		// Get Open/Close information.
		i = j+2;
		while (i < is.size()) {
			if (is[i] == 'M' || is[i] == 'T' || is[i] == 'W' || is[i] == 'H' || 
			is[i] == 'F' || is[i] == 'S' || is[i] == 's') {

				// Base case: closed
				if (is[i+1] == 'C') {
					sopen = "closed";
					sclose = "closed";
				}
				
				else {
					// Open time
					sopen.clear();
					for (j = 1; j < 5; ++j) {
						sopen.push_back(is[i+j]);
					}

					// Close time 
					sclose.clear();
					for (j = 6; j < 10; ++j) {
						sclose.push_back(is[i+j]);
					}
				}

				// Convert string time to int.
				sscanf(sopen.c_str(), "%d", &iopen);
				sscanf(sclose.c_str(), "%d", &iclose);
				
				switch(is[i]) {
					case 'M':
						x->M[1] = iopen;
						x->M[2] = iclose;
						break;

					case 'T':
						x->T[1] = iopen;
						x->T[2] = iclose;
						break;

					case 'W':
						x->W[1] = iopen;
						x->W[2] = iclose;
						break;

					case 'H':
						x->H[1] = iopen;
						x->H[2] = iclose;
						break;

					case 'F':
						x->F[1] = iopen;
						x->F[2] = iclose;
						break;

					case 'S':
						x->S[1] = iopen;
						x->S[2] = iclose;
						break;

					case 's':
						x->s[1] = iopen;
						x->s[2] = iclose;
						break;
					default:
						break;
				}
			}
			i += 1;
		}
		
		// Insert into set.
		locs.insert(x);

	} while (!fp.eof());
	fp.close();

	// Traverse location set and create json object for each one.
	for (lit = locs.begin(); lit != locs.end(); ++lit) {
		x = *lit;
		js = json::object();
		js[x->name] = json::array();
		js[x->name][0] = x->location;
		
		// Meal-Plan
		if (x->mp) js[x->name][1] = "Yes";
		else js[x->name][1] = "No";

		// Breakfast, Lunch, then Dinner.
		if (x->b == 'y') js[x->name][2] = "Breakfast";
		if (x->l == 'y') js[x->name][3] = "Lunch";
		if (x->d == 'y') js[x->name][4] = "Dinner";

		// Open/Close information.
		js[x->name][5] = json::object();
		js[x->name][5]["Monday"] = json::array();
		js[x->name][5]["Monday"][0] = x->M[1];
		js[x->name][5]["Monday"][1] = x->M[2];

		js[x->name][6] = json::object();
		js[x->name][6]["Tuesday"] = json::array();
		js[x->name][6]["Tuesday"][0] = x->T[1];
		js[x->name][6]["Tuesday"][1] = x->T[2];

		js[x->name][7] = json::object();
		js[x->name][7]["Wednesday"] = json::array();
		js[x->name][7]["Wednesday"][0] = x->W[1];
		js[x->name][7]["Wednesday"][1] = x->W[2];

		js[x->name][8] = json::object();
		js[x->name][8]["Thursday"] = json::array();
		js[x->name][8]["Thursday"][0] = x->H[1];
		js[x->name][8]["Thursday"][1] = x->H[2];

		js[x->name][9] = json::object();
		js[x->name][9]["Friday"] = json::array();
		js[x->name][9]["Friday"][0] = x->F[1];
		js[x->name][9]["Friday"][1] = x->F[2];

		js[x->name][10] = json::object();
		js[x->name][10]["Saturday"] = json::array();
		js[x->name][10]["Saturday"][0] = x->S[1];
		js[x->name][10]["Saturday"][1] = x->S[2];

		js[x->name][11] = json::object();
		js[x->name][11]["Sunday"] = json::array();
		js[x->name][11]["Sunday"][0] = x->s[1];
		js[x->name][11]["Sunday"][1] = x->s[2];
		
		cout << js.dump(1) << endl;
	}
	return 0;
}
