import React from 'react';
import ShowCards from './showCards';
import SearchComponent from './search';
export default class searchShowCards extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <>
                <SearchComponent />
                <ShowCards />
            </>
        )
    }
}