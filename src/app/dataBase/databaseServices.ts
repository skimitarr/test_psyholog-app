import {
  DocumentData,
  getDoc,
  DocumentSnapshot,
  updateDoc,
  DocumentReference,
  setDoc,
} from "firebase/firestore";
import { User } from "../store/types";
 import { Answer } from '../store/types';

export const getDBQuestion = async (collection: DocumentReference<DocumentData, DocumentData>) => {
  try {
    const document: DocumentSnapshot<DocumentData> = await getDoc(collection);
    const docData = document.data();
    return docData;
  } catch (error) {
    console.error('Error getting selected documents:', error);
    return null;
  }
};

export const updateDbAnswerLikes = async (
  collection: DocumentReference<DocumentData, DocumentData>,
  answer: Answer,
  id: string
) => {
  try {
    const docData = await getDBQuestion(collection);
    if (docData) {
      //находим нужный answer из БД и заменяем его на полученный
      const updatedAnswers = [...docData.answers];
      const updatedAnswerIndex = docData.answers.findIndex((answer: Answer) => answer.id === id);

      if (updatedAnswerIndex !== -1) {
        updatedAnswers[updatedAnswerIndex] = answer;
        updateDoc(collection, { answers: updatedAnswers });
      }
    }
  } catch (error) {
    console.error('Error updating document:', error);
  }
};

export const getDBUser = async (collection: DocumentReference<DocumentData, DocumentData>) => {
  try {
    const document: DocumentSnapshot<DocumentData> = await getDoc(collection);
    const docData = document.data();
    return docData;
  } catch (error) {
    console.error('Error getting selected documents:', error);
    return null;
  }
};

export const addDbUser = async (
  collection: DocumentReference<DocumentData, DocumentData>,
  userData: User,
) => {
  try {
    const docData = await getDBUser(collection);
    if (!docData) {
      setDoc(collection, {
        slug: userData.slug,
        mail: userData.mail,
        name: userData.name,
        photo: userData.photo ? userData.photo : "",
        role: userData.role ? userData.role : "user",
        favourite: userData.favourite ? userData.favourite : "",
        desc: userData.desc ? userData.desc : "",
        video: userData.video ? userData.video : [],
        articles: userData.articles ? userData.articles : [],
      });
    }
  } catch (error) {
    console.error('Error add user to firestore:', error);
  }
};