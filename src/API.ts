import QuestionCard from "./components/QuestionCard";
import {shuffleArray} from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers:string[];
  question:string;
  type:string;
}

export type QuestionState = Question&{answers:string[]};

export enum Difficulty{ 
  EASY = "eazy",
  MEDIUM = "medium",
  HARD = "hard",

}

export const fetchQuizQuestions = async(amount: number, difficulty: Difficulty) => {
  //  const endpoint = "https://opentdb.com/api.php?amount=${amount}&difficutty=${difficulty}&type=multiple";
  const endpoint = "https://opentdb.com/api.php?amount=10&difficutty=easy&type=multiple";
  const data = await (await fetch(endpoint)).json();
  //console.log(data);
  return data.results.map((question: Question)=>(
    {
      ...question, 
      answers: shuffleArray([...question.incorrect_answers, question.correct_answer,]),
    }
  ));

};