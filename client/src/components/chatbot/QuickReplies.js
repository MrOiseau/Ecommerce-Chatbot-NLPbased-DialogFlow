import React, { Component } from 'react';
import QuickReply from './QuickReply';

class QuickReplies extends Component {
    constructor(props) {
        super(props);                                           //sa props zovem roditelja
        this._handleClick = this._handleClick.bind(this);      //bindujemo this za metodu koju smo dole kreirali   
    }                                                          //da bih mogao pozvati property replyClick iz Chatbot.js komponente

    _handleClick(event, payload, text) {                //metoda za hendlovanje click dogadjaja koju smo kreirali u Chatbot.js,
        this.props.replyClick(event, payload, text);    //sa textom sa dugmeta i quick replies koje sam dobio od DialogFlow-a
    }

    renderQuickReply(reply, i) {
        return <QuickReply key={i} click={this._handleClick} reply={reply} />;
    }

    renderQuickReplies(quickReplies) {
        if (quickReplies) {                             //da li ima nesto u QuickReplies parametru, ako ih ima mapiram ih u QuickReply.js
            return quickReplies.map((reply, i) => {
                return this.renderQuickReply(reply, i);
            }
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="col s12 m8 offset-m2 l6 offset-l3">             {/* omotac - da div poruka 12 kolona dugackak (kroz sve Chatbot komponente) */}
                <div className="card-panel grey lighten-5 z-depth-1">       {/* div za panel */}
                    <div className="row valign-wrapper">                    {/* za panel se stavlja jos jedan omot */}
                        <div className="col s2">                            {/* dodamo avatara (copy-paste iz Message.js), 2 kolone za to */}
                            <a href="/" className="btn-floating btn-large waves-effect light-blue darken-4">{this.props.speaks}</a>     {/* sa this pristupamo propertijima iz class component (QuickReplies.js class component, a Message.js functional component) */}
                        </div>
                        <div id="quick-replies" className="col s10">
                            {this.props.text &&
                                <p>                         {/*  true && expression => vraca expression*/}
                                    {this.props.text.stringValue}
                                    {/* this.props.text */}
                                </p>
                            }
                            {this.renderQuickReplies(this.props.payload)}   {/* renderujemo QuickReplies.. quick_replies su prosledjeni iz Chatbot.js kao property, kao i speaks i text pre sto su */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default QuickReplies; 