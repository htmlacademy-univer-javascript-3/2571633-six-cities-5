import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { offers } from './mock/offers';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

type cardProperties={
  Premium:boolean;
  Price:number;
  Img:string;
  ApartsmentType:string;
  Description:string;
  NumberOfPlaces:number;
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
    NumberOfPlaces:0
  },

  {
    Premium:false,
    Price:132,
    Img:'../markup/Img/apartment-02.jpg',
    ApartsmentType:'Apartment',
    Description:'Canal View Prinsengracht',
    NumberOfPlaces:0
  },

  {
    Premium:true,
    Price:180,
    Img:'../markup/Img/apartment-03.jpg',
    ApartsmentType:'Apartment',
    Description:'Nice, cozy, warm big bed apartment',
    NumberOfPlaces:0
  },

  {
    Premium:false,
    Price:80,
    Img:'../markup/Img/room.jpg',
    ApartsmentType:'Room',
    Description:'Wood and stone place',
    NumberOfPlaces:0
  }];
export default {mainPageCardInfo} ;

root.render(
  <React.StrictMode>
    <App offers={offers} />
  </React.StrictMode>
);
