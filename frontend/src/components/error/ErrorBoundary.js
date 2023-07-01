import React from "react";
import ErrorModal from "./ErrorModal";


export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, lastError: null};
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, lastError: error };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
        console.log({error: error, errorInfo: errorInfo})
    }

    render() {
        if (this.state.hasError) {
            return <ErrorModal
                hasError={this.state.hasError}
                lastError={this.state.lastError}
                clearErrorObj={()=>this.setState({hasError: false, lastError: null})}
            />
        }
        return this.props.children;
    }
}