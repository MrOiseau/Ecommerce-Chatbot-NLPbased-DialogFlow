import React from 'react';


const QuickReply = (props) => {
    if (props.reply.structValue.fields.payload) {
        //if (props.reply.payload) {
        return (
            <a style={{ margin: 3 }} href="/" className="btn-floating btn-large waves-effect green accent-4"
                onClick={(event) =>
                    props.click(     //parametar koji dolazi od QuickReply komponente, idem tamo da implementiram
                        event,
                        props.reply.structValue.fields.payload.stringValue,
                        props.reply.structValue.fields.text.stringValue,
                        {/* props.reply.payload,
                       props.reply.text */},
                    )
                }>
                {props.reply.structValue.fields.text.stringValue}
                {/*  props.reply.text */}
            </a>
        );
    } else {
        return (
            <a style={{ margin: 3 }} target="_blank" rel="noopener noreferrer" href={props.reply.structValue.fields.link.stringValue} 
                /* <a style={{ margin: 3}} href={props.reply.link} */
                className="btn-floating btn-large waves-effect blue-grey">
                {props.reply.structValue.fields.text.stringValue}
                {/*  {props.reply.text} */}
            </a>
        );
    }

};

export default QuickReply;