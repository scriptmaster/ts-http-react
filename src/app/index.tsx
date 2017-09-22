import * as React from "react";

interface IModel {
    name: string;
}

export default class App extends React.Component {
    constructor(public props: IModel) {
        super(props);
    }

    render() {
        return <div>Hello : {this.props.name}</div>;
    }
}
