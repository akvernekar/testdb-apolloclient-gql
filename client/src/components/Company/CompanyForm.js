import React from 'react'
import {graphql} from 'react-apollo'
import {getAllCompanies,addCompanyMutation} from '../allquerys/companyquerys'
import client from '../../App'

class CompanyForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            companyName:'',
            tenantId:null
        }
    }



    submit=(e)=>{
        const formData={
            companyName:this.state.companyName,
            tenantId:Number(this.state.tenantId)
        }
        e.preventDefault()
        console.log(this.state)
        this.props.submit(formData)
        
    }

    handle=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render(){
        return(
            <div>
                <br/>
                <form onSubmit={this.submit}>
            <label>Company Name<input onChange={this.handle} type='text' name="companyName" list="companyName" />
            <datalist id="companyName">{this.props.data.loading?"loading":this.props.data.getAllCompanies.map(company=>{
                return(
                    <option value={company.companyName}>{company.companyName}</option>
                )
            })}</datalist></label>
           <br/>
        <label>Tenant Name<select name="tenantId" onChange={this.handle}><option value="" >select tenant</option>
            {this.props.data.loading?"loading":
            this.props.data.getAllCompanies.map(company=>{
                return(
                    <option value={company.id}>{company.companyName}</option>
                )
            })}</select></label>
            <br/>
            <input type='submit'/>
            </form>
            {/* <input type="text" name="product" list="productName"/> */}


{/* <datalist id="productName">
    <option value="Pen">Pen</option>
    <option value="Pencil">Pencil</option>
    <option value="Paper">Paper</option>
</datalist> */}

            </div>
        )
    }
}

export default graphql(getAllCompanies,addCompanyMutation)(CompanyForm)
