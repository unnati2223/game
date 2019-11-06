import React, { Component } from 'react';
import QuizOptions from './QuizOptions';
import classNames from 'classnames';

class Quiz extends Component {
    constructor(props) {
        super(props);
        let riddle = this.playGame();
        let correct = false;
        let gameOver = false;
        let next = false;
        let score = 0;
        this.state = { riddle, correct, gameOver, next, score }

        this.renderOptions = this.renderOptions.bind(this);
        this.checkResults = this.checkResults.bind(this);
        this.playGame = this.playGame.bind(this);
        this.play = this.play.bind(this);
        this.next = this.next.bind(this);
        if (!this.state.correct) {
            this.playGame();
        }

    }
    checkResults(option) {
        this.setState({ next: true });
        if (this.state.riddle.answer === option) {
            let score = this.state.score + 5;
            this.setState({ correct: true, gameOver: false, next: true, score: score });
            console.log("correct answer and score is = " + score);
        } else {
            console.log("wrong answer");
            this.setState({ correct: false, gameOver: true, next: true });
        }
    }
    renderMessage() {
        if (this.state.correct) {
            return <h2>Good Job!!!</h2>
        } else {
            return <h2>Bad Luck!!!</h2>
        }
    }
    generateRandomOptions(sum) {
        let resultArray = [];

        let randomNumberArray = [];
        while (randomNumberArray.length <= 3) {
            let randomNumber = this.randomNumber(1, 19);
            if (randomNumberArray.indexOf(randomNumber) > -1) {
                continue;
            } else {
                randomNumberArray.push(randomNumber);
            }
        }

        for (let i = 0; i < 3; i++) {
            let addSubtract = this.randomNumber(0, 1);
            let result = sum;
            if (addSubtract === 1) {
                //add number
                result += randomNumberArray[i];
                resultArray.push(result);

            } else {
                //subtract number
                result -= randomNumberArray[i];
                resultArray.push(result);
            }
        }


        return resultArray;
    }
    renderOptions() {
        return (
            <div className="options">
                {this.state.riddle.resultArray.map((optionVariant, i) =>
                    <QuizOptions option={optionVariant} key={i} checkResults={(option) => this.checkResults(option)} />
                )}
            </div>
        );
    }
    randomNumber(max, min) {
        return (
            Math.floor(Math.random() * (max - min + 1)) + min
        );
    }
    playGame() {
        let field1 = this.randomNumber(20, 50);
        let field2 = this.randomNumber(20, 50);
        let result = field1 + field2;
        let resultArray = this.generateRandomOptions(result);
        resultArray.push(result);
        resultArray.sort(function (a, b) { return 0.5 - Math.random() });
        let riddle = {
            resultArray: resultArray,
            field1: field1,
            field2: field2,
            answer: result
        };
        if (this.state && (this.state.gameOver || this.state.next)) {
            this.setState({ riddle: riddle });
        } else {
            return riddle;
        }


    }
    play() {
        this.setState({ correct: false, gameOver: false, next: false });

    }


    next() {

        this.setState({ next: false });
        this.playGame();
    }
    render() {
        return (
            <div className="quiz">
                <div className="quiz-content">
                    <p className="question"> What is the sum of <span className="text-info">{this.state.riddle.field1}</span> and <span className="text-info">{this.state.riddle.field2}</span>?</p>

                    {this.renderOptions()}

                    <p>correct : {this.state.correct ? "True" : "False"}</p>
                    <p>game over : {this.state.gameOver ? "True" : "False"}</p>
                    <div className={classNames("after", { "hide": !this.state.next }, { "wrong animated zoomInDown": !this.state.correct }, { "correct animated zoomInDown": this.state.correct })}>
                        {this.renderMessage()}
                    </div>
                    <div className="play-again">
                        <a className="button" onClick={this.play}>Play Again</a>
                    </div><br />
                    <div className="next-button" onClick={this.next}>
                        <a >Next</a>

                    </div>
                </div>
            </div>
        );
    }
}

export default Quiz;