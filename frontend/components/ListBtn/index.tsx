import styles from "./ListBtn.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import React, { ReactNode, useState } from "react";
import Button from "./CustomButtonComponent.tsx";

const ListBtn: React.Fc = () => { 
  const [left, something] = useState(-450);
  const anything = {left:left, top:0}
  return (
    <>
      <div className = {styles.logo}></div>
      <div className={styles.sidebar} style = {anything}>  {/*apply style into styles sidebar*/}
      <div onClick = {() => {something(-450)}} className = {styles.ListButton}></div>
{/*
<div className = {styles.emoji}><FontAwesomeIcon icon={faFilter} /> </div>
*/}
      {/* filter icon */}
      
      <div id="myBtnContainer">
        <div className = {styles.emoji}><FontAwesomeIcon icon={faFilter} /> </div>
        <button className={styles.btn}> Meal Swipe </button>
	<button className={styles.btn2}> Vegetarian </button>
      </div>

{/*	<a href="#">ㅤㅤㅤㅤㅤFilter</a>   
	- meal swipe
	- vegetarian
*/}
        <a href="#">ㅤㅤㅤㅤ</a>	
	<div>    <a href="#">ㅤㅤDining Place 1</a> </div>
        <div>    <a href="#">ㅤㅤDining Place 2</a> </div>
        <div>    <a href="#">ㅤㅤDining Place 3</a> </div>
        <div>    <a href="#">ㅤㅤDining Place 4</a> </div>
        <div>    <a href="#">ㅤㅤDining Place 5</a> </div>
        <div>    <a href="#">ㅤㅤDining Place 6</a> </div>
        <div>    <a href="#">ㅤㅤDining Place 7</a> </div>
        <div>    <a href="#">ㅤㅤDining Place 8</a> </div>
        <div>    <a href="#">ㅤㅤDining Place 9</a> </div>
        <div>    <a href="#">ㅤㅤDining Place 10</a> </div>
        <div>    <a href="#">ㅤㅤDining Place 11</a> </div>
        <div>    <a href="#">ㅤㅤDining Place 12</a> </div>
        <div>    <a href="#">ㅤㅤDining Place 13</a> </div>
        <div>    <a href="#">ㅤㅤDining Place 14</a> </div>
        <div>    <a href="#">ㅤㅤDining Place 15</a> </div>
        <div>    <a href="#">ㅤㅤ</a> </div>
        <div>    <a href="#">ㅤㅤ</a> </div>
        <div>    <a href="#">ㅤㅤ</a> </div>



{/*
        <a href="javascript:void(0)" className={styles.closebtn} onclick="closeNav()">&times;</a>
	<a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
	*/}
      </div>
       <div onClick = {() => {something(0)}} className = {styles.ListButton}></div>
    </>
  );
}

export default ListBtn;

