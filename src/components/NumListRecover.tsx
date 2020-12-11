import React, { Component, FC, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { db } from '../components/Firebase/firebase2.js';
import { stringify } from 'querystring';
import {


        IonList, IonItem, IonButton, IonAlert, IonListHeader, IonLabel, IonHeader

    } from '@ionic/react';

import { nodeModuleNameResolver } from 'typescript';
import "./NumberList.css";

async function returnAllDocs(collection:string): Promise<string[]>
{
  //let test: Array<string>=["",""]; 
  var returnArray:string[] = new Array(16);
  let i: number = 0;
  return db.collection(collection).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        returnArray[i]= doc.id;
        i++;
    });
    return returnArray;
  });
 
}
    

    type Item = {
        itemName: Array<string>;
        subItems?: {[category: string]: string[] | undefined;};
    }

 

   

    const NumberList: React.FC<Item> = (item) => {
        const [showAlert1, setShowAlert1] = useState(false);

        const { itemName,subItems } = item;
        console.log(itemName);

        return(
            <IonList>
                {itemName && itemName.map((i) => {
                return (
                <IonList>
                    <IonListHeader >
                    
                        <IonLabel>
                        <strong> {i} </strong> 
                        </IonLabel>                         
                    </IonListHeader> 
                    {subItems[i] && subItems[i].map( element => {
                        return (
                        <IonItem>
                            <IonLabel>
                                <small> {element} </small>
                            </IonLabel>
                            <IonButton slot= "end" color= "danger" onClick={() => setShowAlert1(true)} expand="block">Add Item </IonButton> 
                            <IonAlert
                    isOpen={showAlert1}
                    onDidDismiss={() => setShowAlert1(false)}
                    cssClass='my-custom-class'
                    header={ i }
                    //subHeader={'Subtitle'}
                    message={'Would you like to keep shopping?'}
                    buttons= {[
                         {
                             text: 'Keep Shopping',
                             handler: () => {
                                console.log('Continued shopping');
                             }
                        },
                        {
                            text: 'Cart',
                            handler: () => {
                                console.log("Check out to Cart");
                            }
                        }
                        ]}
                    />
                        </IonItem>)
                    })}
                 

                {/* <IonItem key={i}>
                <p> header description </p>
                <IonButton slot= "end" color= "danger" onClick={() => setShowAlert1(true)} expand="block">Add Item </IonButton> 
                <IonAlert
                    isOpen={showAlert1}
                    onDidDismiss={() => setShowAlert1(false)}
                    cssClass='my-custom-class'
                    header={ i }
                    //subHeader={'Subtitle'}
                    message={'Would you like to keep shopping?'}
                    buttons= {[
                         {
                             text: 'Keep Shopping',
                             handler: () => {
                                console.log('Continued shopping');
                             }
                        },
                        {
                            text: 'Cart',
                            handler: () => {
                                console.log("Check out to Cart");
                            }
                        }
                        ]}
                    />
                  
                </IonItem> */}
                </IonList>
                )})}
                
            </IonList>
            
        );
        
    };
    
    export default NumberList;