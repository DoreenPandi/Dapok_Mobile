import { collection, getDocs } from "firebase/firestore/lite";
import { useState, useEffect } from "react";

const [allQuestions, setAllQuestions] = useState([])

async function fetchTestQuestionnaire() {
    const testQuestionsRef = collection(db, "testquestions")

    const testQuestionsSnapshot = await getDocs(testQuestionsRef)
    let testQuestions = [];
    testQuestionsSnapshot.forEach((doc) => {
        testQuestions.push(doc.data())
    })

    setAllQuestions(testQuestions)
}

useEffect(() => {
    fetchTestQuestionnaire()
}, [])

export default data = allQuestions;