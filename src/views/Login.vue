<!-- <template>
  <div class="login">
    <div class="container-fluid">
        <div class="col-md-3">
          <div class="card">
            <div>
              <div class="tengah">
              <h1 class="h3 mb-3 font-weight-normal">Please Sign in</h1> <br>
          
              <div class="form-group">
                  <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" 
                          placeholder="Enter email" autocomplete="email">
              </div><br>
              <div class="form-group">
                  <input type="password" @keyup.enter="login" v-model="password" class="form-control" id="exampleInputPassword1" 
                          placeholder="Password" autocomplete="password">
              </div><br>
              <div class="form-group">
                  <button class="btn btn-primary" @click="login">Login</button>
                  <button class="btn btn[primary" @click="register">Register</button>
              </div>    
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {fb,db} from '../firebase'
export default {
  name: "Login",
  props: {
    msg: String
  },
  data(){
      return {
          name:null,
          email:null,
          password:null
      }
  },
  methods:{
      login(){
        // console.log(this.password);
        fb.auth().signInWithEmailAndPassword(this.email, this.password)
                  .then(() => {                    
                    console.log("Signin successfully!");
                    this.$router.replace('admin');  
                  })
                  .catch(function(error) {
                      // Handle Errors here.
                      var errorCode = error.code;
                      var errorMessage = error.message;
                      if (errorCode === 'auth/wrong-password') {
                          alert('Wrong password.');
                      } else {
                          alert(errorMessage);
                      }
                      console.log(error);
                  });
      },
      register(){
        fb.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then((user) => {
                $('#login').modal('hide')
                
                db.collection("profiles").doc(user.user.uid).set({
                    name: this.name
                })
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
                this.$router.replace('admin');
            })
            .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
      }
  }
};
</script> -->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style scoped lang="scss">
</style> -->
<style>
.tengah {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>

<template>
    <div class="vue-tempalte">
      <div class="tengah">
        <form @submit.prevent="userLogin">
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" v-model="user.email" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="user.password" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>

            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot-password">Forgot password ?</router-link>
            </p>
        </form>
        </div>
    </div>
</template>


<script>
import firebase from "firebase";

export default {
  data() {
    return {
      user: {   
        email: '',
        password: ''
      }
    };
  },
  methods: {
    userLogin() {
        firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
            this.$router.push('/admin')
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }
};
</script>