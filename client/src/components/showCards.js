import React from 'react';
import Card1 from './CardComponent';
import { connect } from 'react-redux';
function mapStateToProps(state) {
    return {
        history: state.UserReducer.history
    };
}
export default connect(mapStateToProps)(function ShowCards(props) {
    const { history } = props;
    const historyList = history;
    debugger
    return (
        <>

            <div class="d-flex justify-content-center">
                {<Card1 width={"18rem"} history={historyList[0]}></Card1>}
            </div>
            <div class="d-flex justify-content-center">
                {historyList.slice(1, 4).map(hist => (

                    <Card1 width={"12rem"} history={hist}
                    ></Card1>
                ))}
            </div>
        </>
    );
})