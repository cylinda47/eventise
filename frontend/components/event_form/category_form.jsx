import React from 'react';
import merge from 'lodash/merge';

export default class CategoryForm extends React.Component {
    constructor(props){
        super(props);
        this.categories = ["Music", "Arts", "Food_Drink", "Classes", "Parties", "Sports_Wellness", "Networking"]
        this.categoryOption = this.categoryOption.bind(this);
        this.setOptions = this.setOptions.bind(this);
    }

    setOptions(idx){
        return event => {
            let newCategory = merge([], this.props.category_names);
            let name = $(`#category-option-${idx} option:selected`).val().toLowerCase();
            newCategory[idx] = name;
            this.props.setCategory(newCategory);
        }
    }

    categoryOption(idx) {
        return(
            <div className="category-option">
                <select
                    value={this.props.category_names[idx]}
                    id={`category-option-${idx}`}
                    className="category-form-dropdown"
                    onChange={this.setOptions(idx)}>
                    <option value=""></option>
                    {
                        this.categories.map((category) =>
                            <option value={category.toLowerCase()} key={category}>{category.replace("_", " & ")}</option>
                        )
                    }
                </select>
            </div>
        )
    }

    render(){
        return(
            <div className="category-form">
                <div className="event-form-header">
                    <div className="header-section-box">{this.props.formType === 'update' ? "2" : "3"}</div>
                    <h1>Categories</h1>
                </div>
                <div className="category-container">
                    <div className="category-choose">
                    <span>Please choose up to 2 categories:
                        </span>
                    </div>
                    {this.categoryOption(0)}
                    {this.categoryOption(1)}
                </div>
            </div>
        )
    }
}