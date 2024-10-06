import React from 'react';


import ReactDOM from 'react-dom/client';

import {Main} from './components/Main/main';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
type cardProperties={
  Premium:boolean;
  Price:number;
  Img:string;
  ApartsmentType:string;
  Description:string;
  NumberOfPlaces?:number;
};
export type {cardProperties};

const mainPageCardInfo:cardProperties[] = [
  {
    Premium:true,
    Price:120,
    Img:'../markup/Img/apartment-01.jpg',
    ApartsmentType:'Apartment',
    Description:'Beautiful &amp; luxurious apartment at great location',
    NumberOfPlaces:132
  },
  {
    Premium:false,
    Price:80,
    Img:'../markup/Img/room.jpg',
    ApartsmentType:'Room',
    Description:'Wood and stone place',
  },

  {
    Premium:false,
    Price:132,
    Img:'../markup/Img/apartment-02.jpg',
    ApartsmentType:'Apartment',
    Description:'Canal View Prinsengracht',
  },

  {
    Premium:true,
    Price:180,
    Img:'../markup/Img/apartment-03.jpg',
    ApartsmentType:'Apartment',
    Description:'Nice, cozy, warm big bed apartment',
  },

  {
    Premium:false,
    Price:80,
    Img:'../markup/Img/room.jpg',
    ApartsmentType:'Room',
    Description:'Wood and stone place',
  }];
export default {mainPageCardInfo} ;

root.render(
  <React.StrictMode>

    <Main mainPageCardInfo={mainPageCardInfo}/>	

  </React.StrictMode>
);
