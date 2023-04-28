import { Component } from 'react';

import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

class Calculator extends Component {
    constructor(props) {
        super()
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    state = { ...initialState }
    
    clearMemory() {
        this.setState({ ...initialState })
    }
    
    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true})
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const newValues = [ ...this.state.values ]
            try {
                newValues[0] = eval(`${newValues[0]} ${currentOperation} ${newValues[1]}`)
            } catch (error) {
                newValues[0] = this.state.values[0]                
            }
            newValues[1] = 0

            this.setState({
                displayValue: newValues[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values: newValues
            })
        }
    }
    
    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) return
        
        const clearDisplay = this.state.displayValue === '0' ||
            this.state.clearDisplay

        const currentValue = clearDisplay ? '' : this.state.displayValue
        const newDisplayValue = currentValue + n

        this.setState({ displayValue: newDisplayValue, clearDisplay: false })

        if (n !== '.') {
            const index = this.state.current
            const newValue = parseFloat(newDisplayValue)
            const newValues = [ ...this.state.values]
            newValues[index] = newValue
            this.setState({ values: newValues })
            console.log(newValues)
        }
    }
    
    render() {
        return (
            <div className="calculator">
                <Display label={this.state.displayValue}/>
                <Button
                    triple
                    onEventClick={this.clearMemory}
                    label="AC"
                />
                <Button
                    operation
                    onEventClick={this.setOperation}
                    label="/"
                />
                <Button
                    onEventClick={this.addDigit}
                    label="7"
                />
                <Button
                    onEventClick={this.addDigit}
                    label="8"
                />
                <Button
                    onEventClick={this.addDigit}
                    label="9"
                />
                <Button
                    operation
                    onEventClick={this.setOperation}
                    label="*"
                />
                <Button
                    onEventClick={this.addDigit}
                    label="4"
                />
                <Button
                    onEventClick={this.addDigit}
                    label="5"
                />
                <Button
                    onEventClick={this.addDigit}
                    label="6"
                />
                <Button
                    operation
                    onEventClick={this.setOperation}
                    label="-"
                />
                <Button
                    onEventClick={this.addDigit}
                    label="1"
                />
                <Button
                    onEventClick={this.addDigit}
                    label="2"
                />
                <Button
                    onEventClick={this.addDigit}
                    label="3"
                />
                <Button
                    operation
                    onEventClick={this.setOperation}
                    label="+"
                />
                <Button
                    double
                    onEventClick={this.addDigit}
                    label="0"
                />
                <Button
                    onEventClick={this.addDigit}
                    label="."
                />
                <Button
                    operation
                    onEventClick={this.setOperation}
                    label="="
                />
            </div>
        )
    }
}

export default Calculator