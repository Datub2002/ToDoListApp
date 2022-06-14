import React, { Component } from 'react';
import './UserProfile.css'
import Swal from 'sweetalert2'
class UseProfile extends Component {
   
        state = {
            values: {

                firstName : '',
                lastName : '',
                userName: '',
                Email : '',
                password : '',
                passwordConfirm : '',
            },
            errors: {

                firstName : '',
                lastName : '',
                userName: '',
                Email : '',
                password : '',
                passwordConfirm : '',
            }
        }
        handleInputChange = (e) =>{                            
            let {name,value,type} = e.target;
            let newValues = {...this.state.values,[name]: value};

            let newErrors = {...this.state.errors};
            if(value.trim() === '')
            {
                newErrors[name] = name + ' is required';
            }else{
                newErrors[name] = '';
            }
            this.setState({
                values : newValues,
                errors : newErrors,
            })
            if(name === 'userName'){
                const regUser = "^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$";
                if(value.match(regUser)){
                    newErrors[name] = '';
                }else{
                    newErrors[name] = name + ' must have 8-20 characters long, dot and underScore is...';

                }
            }
            if( type === 'email'){
                const regEmail =  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
                if(value.match(regEmail))
                    {
                        newErrors['Email'] = '';
                    }else{
                        newErrors['Email'] = name + ' is invalid !!!';                      
                    }
               
            }
            
            if(type === 'password' && name === 'password'){
                const mediumRegex = "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})";
                if(value.match(mediumRegex))
                {
                    newErrors[name] = '';

                }else{
                    newErrors[name] = name + ' must contain at least 1 digit,1 lowercase or 1 uppercase character, must be six characters or longer';
                }
            }
            if(name === 'passwordConfirm'){
                if(value === newValues['password']){
                    newErrors['passwordConfirm'] = '';
                }else{
                    newErrors['passwordConfirm'] = "pass confirm doesn't match";

                }
            }
            
                        
            }
            handleSubmit = (e) =>{
                // Ngăn chặn hành vi mặc định của form
                e.preventDefault();
                //Bắt Lỗi submit khi chưa nhập đầy đủ thông tin và lỗi nhập thông tin
                let successContent = '';
                let errorsContent = '';
                let valid = true;
                let {values,errors} = this.state;
                for( let i in values) {
                    if( values[i] === '')
                    {
                        valid = false;
                        errorsContent += `<div className='text-left'>
                        <p className='text-danger'> <b>${i} </b>: is invalid </p>
                   
                    </div>`
                    }
                    successContent += `<div className='text-left'>
                    <p> <b>${i} </b>: ${values[i]}</p>
               
                </div>`
                }
                for( let i in errors) {
                    if( errors[i] !== '')
                    {
                        valid = false;
                        errorsContent += `<div className='text-left'>
                            <p className='text-danger'> <b>${i} </b>: is invalid </p>
                       
                        </div>`
                    }                    
                }
                if(!valid)
                {
                   
                    Swal.fire({
                        title: 'Error!',
                        html: errorsContent ,
                        icon: 'error',
                        confirmButtonText: 'Got it !!'
                      })
                    return;
                }else{
                    Swal.fire({
                        title: 'Error!',
                        html: successContent ,
                        icon: 'success',
                        confirmButtonText: 'Accept !!'
                      })

                }

            }
            render() {
        return (
            <div style={{ backgroundColor: '#eee' }} className='container-fluid d-flex justify-content-center'>

                <form onSubmit={this.handleSubmit} className='w-50 bg-white p-5 m-5'>
                    <h3 className='text-center pb-4'>
                        User Profile
                    </h3>
                    <div className='row '>
                        <div className="col-6 ">
                            <div className="group">
                                <input value={this.state.values.firstName} type="text" name='firstName'  onChange={this.handleInputChange} />
                                <span className="highlight" />
                                <span className="bar" />
                                <label>firstName</label>
                                <span className='text text-danger'>{this.state.errors.firstName}</span>
                            </div>

                        </div>
                        <div className=" col-6 ">
                            <div className='group'>

                            <input value={this.state.values.lastName} type="text" name='lastName'   onChange={this.handleInputChange} />
                                <span className="highlight" />
                                <span className="bar" />
                                <label>lastName</label>
                                <span className='text text-danger'>{this.state.errors.lastName}</span>
                            </div>
                        </div>

                    </div>
                    <div className='row '>
                        <div className="col-12 ">
                            <div className='group'>

                                <input value={this.state.values.userName} type="text" name='userName'   onChange={this.handleInputChange}/>
                                <span className="highlight" />
                                <span className="bar" />
                                <label>userName</label>
                                <span className='text text-danger'>{this.state.errors.userName}</span>

                            </div>
                        </div>


                    </div>
                    <div className='row '>
                        <div className="col-12 ">
                            <div className='group'>

                                <input value={this.state.values.Email} type="email" name='Email'   onChange={this.handleInputChange} />
                                <span className="highlight" />
                                <span className="bar" />
                                <label>Email</label>
                                <span className='text text-danger'>{this.state.errors.Email}</span>

                            </div>
                        </div>


                    </div>
                    <div className='row '>
                        <div className="col-6 ">
                            <div className="group">
                                <input value={this.state.values.password} type="password" name='password'   onChange={this.handleInputChange}/>
                                <span className="highlight" />
                                <span className="bar" />
                                <label>password</label>
                                <span className='text text-danger'>{this.state.errors.password}</span>

                            </div>

                        </div>
                        <div className=" col-6 ">
                            <div className='group'>

                            <input value={this.state.values.passwordConfirm} type="password"  name='passwordConfirm' onChange={this.handleInputChange} />
                                <span className="highlight" />
                                <span className="bar" />
                                <label>password confirm</label>
                                <span className='text text-danger'>{this.state.errors.passwordConfirm}</span>

                            </div>
                        </div>
                    </div>
                   <button className='w-100 btn btn-dark text-white p-2' style={{fontSize:20}}>Submit</button>



                </form>




            </div>
        );
    }
}

export default UseProfile;