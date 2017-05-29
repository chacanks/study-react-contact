import React from 'react';
import ContactInfo from './ContactInfo.js';
import ContactDetails from './ContactDetails.js';
import update from 'react-addons-update';
import ContactCreate from './ContactCreate.js';

export default class Contact extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            selectedKey : -1
            , keyword : ''
            , contactData : [
                {
                    name:'Name1'
                    , phone : '010-0000-1111'
                }, {
                    name:'Name2'
                    , phone : '010-0000-2222'
                }, {
                    name:'Name3'
                    , phone : '010-0000-3333'
                }, {
                    name:'Name4'
                    , phone : '010-0000-4444'
                }, {
                    name:'Name5'
                    , phone : '010-0000-5555'
                }
            ]
        };
        console.log('constructor init')
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit   = this.handleEdit.bind(this);

    }

    handleCreate(contact){
        this.setState({
            contactData : update(this.state.contactData, {$push : [contact]})
        });
    }

    handleRemove(){

        if(this.state.selectedKey < 0){
            return;
        }

        this.setState({
            contactData : update(
                  this.state.contactData
                , {$splice : [[this.state.selectedKey, 1]]}
            ), selectedKey : -1

        });
    }

    handleEdit(name, phone){
        this.setState({
            contactData : update(
                this.state.contactData
                , {
                    [this.state.selectedKey] : {
                        name : { $set : name}
                        , phone : {$set : phone}
                    }
                }
            )
        });
    }

    handleChange(e){
        this.setState({
            keyword : e.target.value
        });
    }

    handleClick(key){
        this.setState({
            selectedKey : key
        });
        console.log(key, 'is selected.');
    }

    render(){
        const mapToComponents = (data) => {
            data.sort((a,b)=>{
                return a.name > b.name;
            });
            data = data.filter((contact)=>{
                return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1;
            });
            return data.map((contact, i) => {
                return (<ContactInfo 
                            contact={contact}  
                            key={i}
                            onClick={()=>this.handleClick(i)}/>);
            });
        };

        return (
            <div>
                <h1>Contacts!</h1>
                <input 
                    name="keyword" 
                    placeholder="Search"
                    value={this.state.keyword}
                    onChange = {this.handleChange}
                />
                <div>{mapToComponents(this.state.contactData)}</div>
                <ContactDetails
                    isSeleted={this.state.selectedKey != -1}
                    contact  ={this.state.contactData[this.state.selectedKey]}
                    onRemove ={this.handleRemove}
                    onEdit   ={this.handleEdit} 
                    />
                <ContactCreate
                    onCreate={this.handleCreate}/>
            </div>
        );
    }
}