
import React, { useState } from 'react';
import { IonContent, IonModal, IonFooter, IonHeader, IonItem, IonLabel, IonNote, IonPage, IonTitle, IonToolbar, IonList, IonButton, IonFab, IonIcon, IonFabButton, IonApp } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import InventoryDisplay from '../components/InventoryDisplay';
import { db } from '../components/Firebase/firebase2.js';
import {close, help, basketOutline, basketSharp, ellipse, fastFoodOutline, fileTrayFullOutline, square, triangle } from 'ionicons/icons';
import { Component } from 'ionicons/dist/types/stencil-public-runtime';
import { stringify } from 'querystring';
import { promises } from 'dns';

//https://firebase.google.com/docs/firestore/query-data/get-data
//used firebase documentation as a guide for below function
async function returnAllDocs(collection:string): Promise<string[]>
{
  var returnArray:string[] = new Array(11);
  let i: number = 0;
  return db.collection(collection).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        returnArray[i]= doc.id;
        i++;
    });
    return returnArray;
  });
 
}

function updateFirestore(bag:{}){
  //key returns collection name
  //values return array like pair of item name and quantity
  let listOfKeys = Object.keys(bag);
  let valuePair = Object.values(bag);
  let count:number = 0;
  while(count<listOfKeys.length){
    db.collection(listOfKeys[count]).doc(valuePair[count][0]).update({
      "quantity" : valuePair[count][1]
    })
    count++;
  }
}

const Tab1: React.FC = () => {
  const [myModal, setMyModal] = useState({ isOpen: false });
  const [catList, setCatList] = useState<string[]>([]);
  const [docMap, setDocMap] = useState<{[category: string]: string[];}>({});
  
  let arrayOfDocs = returnAllDocs("Category Names");
  let categoryLists: string[];

  arrayOfDocs.then((docs: string[])=>{
    categoryLists = docs;
    setCatList(categoryLists);

    categoryLists.forEach(c => {
      let useDocsList = returnAllDocs(c);
      
      useDocsList.then((docs: string[])=>{
        let itemList: string[];
        itemList = docs;
        docMap[c] = itemList;
        setDocMap(docMap);
      });
    })
    
  });

  return (
    <IonApp>
      <IonPage>
        <IonContent fullscreen>
         <IonToolbar>
           <IonTitle>Pantry Inventory</IonTitle>
       
          </IonToolbar>
      
      <IonButton slot= "end" color= "danger" ></IonButton>
        <p className="ion-padding-start ion-padding-end"> </p>
          <InventoryDisplay itemName={catList} subItems={docMap}  ></InventoryDisplay>
          <p className="ion-padding-start ion-padding-end"></p>

        
      </IonContent>
      <MyModal isOpen={myModal.isOpen} 
      onClose={() => setMyModal({isOpen:false})}/>
      <IonFooter>
        <IonToolbar>
          <IonButton id="myBag" slot="end" onClick={() =>  setMyModal({isOpen:true})}>Checkout
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  </IonApp>
  );
};

export default Tab1;

// REFACTORING Modal
const MyModal:React.FC<any> = ({isOpen, onClose}) => {

  return <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              My Bag
            </IonTitle>
            <IonButton slot ="end" onClick={onClose} >
              <IonIcon slot= "icon-only" icon ={close}>
              </IonIcon>
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className ="ion-padding">
        <IonItem>
          <IonLabel>
              Item 
            </IonLabel>
        </IonItem>
        </IonContent>

        <IonButton onClick={onClose} href= "https://forms.gle/yjcNm1owrxcMzsxx7" target= "_blank"> Confirm
        </IonButton>
      </IonModal>
}