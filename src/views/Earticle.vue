<template>
  <div class="earticle">
    <div class="container">
      <div class="row">
        <div class="col-10 text-left">
          <h3>Article</h3>
        </div>
        <div class="col-2 text-right">
          <button @click="addNew" class="btn btn-sm btn-primary float-right">Add Article</button>
        </div>

      </div>
      <hr>

      <div class="table-responsive">
        
          <table class="table">
            <thead>
              <tr>
                <th>Judul</th>
                <th>Penulis</th>
                <th>Modify</th>
              </tr>
            </thead>

            <tbody>
                <tr v-for="earticle in earticles">
                  <td>
                    {{earticle.data().judul}}
                  </td>
                  <td>
                    {{earticle.data().penulis}}
                  </td>
                  <td>
                    <button class="btn btn-sm btn-primary " @click="editData(earticle)">Edit</button>&nbsp;
                    <button class="btn btn-sm btn-danger" @click="deleteData(earticle.id)">Delete</button>
                  </td>
                </tr>
            </tbody>
          </table>
      </div>

    </div>

      <!-- Modal -->
      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editLabel">Edit Arcticle</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

                <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Title" class="form-control" v-model="earticle.judul">
                    </div>
                    <div class="form-group">
                      <input type="text" placeholder="Url" class="form-control" v-model="earticle.url">
                    </div>                    

                    <div class="form-group">
                      <vue-editor v-model="earticle.content"></vue-editor>
                    </div>
                  </div>
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Article Details</h4>
                    <hr>

                    <div class="form-group">
                      <select name="kategori" id="kategori" class="form-control" v-model="earticle.kategori">
                          <option value="">Select category</option>
                            <option v-for="(item, index) in category" :value="item.category_nm" >
                            {{item.category_nm}}
                            </option>
                      </select>
                    </div>

                    <div class="form-group">
                      <input type="text" @keyup.188="addTag" placeholder="Writer" class="form-control" v-model="earticle.penulis">
                      
                    </div>

                    <div class="form-group">
                      <label for="product_image">Images</label>
                      <input type="file" @change="uploadImage" class="form-control">
                    </div>

                    <div class="form-group d-flex">
                      <div class="p-1">
                          <div class="img-wrapp">
                              <!-- <img :src="image" alt="" width="80px">
                              <span class="delete-img" @click="deleteImage()">X</span> -->
                          </div>
                      </div>
                    </div>

                  </div>
                </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="addData()" type="button" class="btn btn-primary" v-if="modal == 'new'">Save changes</button>
              <button @click="updateData()" type="button" class="btn btn-primary" v-if="modal == 'edit'">Apply changes</button>
            </div>
          </div>
        </div>
      </div>
          
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import {fb, db} from'../firebase';

export default {
  name: 'Earticle',
  components: {
    VueEditor
  }, 
  props: {
    msg: String
  },

  data(){
    return{
      earticles: [],
      category: [],
      earticle:{
        judul: "",
        url: "",
        content: "",
        penulis: "",
        kategori: "",
        created_dttm: "",
        images: [],
      },     
      activeItem:null,
      modal: null,
      tag: null     
    };
  },
  methods:{
    watcher(){
      db.collection("e-artikel").get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          this.earticles.push(doc);
        });
      });
    },
    deleteImage(img,index){

    },
    uploadImage(e){
      if(e.target.files[0]){
        
        let file = e.target.files[0];
        console.log(e);    
        var storageRef = fb.storage().ref('earticle/'+ Math.random() + '_'  + file.name);
  
        let uploadTask  = storageRef.put(file);
  
        uploadTask.on('state_changed', (snapshot) => {
          
        }, (error) => {
          // Handle unsuccessful uploads
        }, () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.earticle.images.push(downloadURL);
          });
        });
      }
    },
    addNew(){
      this.modal = 'new';
      this.reset();
      $('#myModal').modal('show');
    },
    reset(){
      this.earticle={
        judul:null,
        url: null,
        content: null,
        penulis: null,
        kategori: null,
        created_dttm: null,
        images: []
      }
    },
    updateData(){
      db.collection('e-artikel').doc(this.activeItem).update(this.earticle);
      console.log(this.activeItem);
        Toast.fire({
          type: 'success',
          title: 'Updated  successfully'
        })
      $('#myModal').modal('hide');
      this.watcher();
    },
    editData(earticle){
      this.modal = 'edit';
      this.earticle = earticle.data();
      this.activeItem = earticle.id;
      console.log(this.activeItem);
      $('#myModal').modal('show');
    },
    deleteData(earticle){
      console.log(earticle);
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          db.collection('e-artikel').doc(earticle).delete()
          Toast.fire({
            type: 'success',
            title: 'Deleted  successfully'
          })
        }
        
      })
      this.watcher();
    },
    addData(){
      db.collection('e-artikel').add(this.earticle);
          Toast.fire({
            type: 'success',
            title: 'Product created successfully'
          })      
      $('#myModal').modal('hide');
      this.watcher();
    },  
    readData(){
      db.collection("e-artikel").get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          this.earticles.push(doc);
        });
      });

      db.collection("artikel-kategori").get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          this.category.push(doc.data());
          // console.log(doc.id,doc.data());
        });
      });      
    }
  },
  created(){
    this.readData();
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#setting {
  margin-top: 5px;
  margin-left: 43px;
}

.VueTables__search-field label {
  justify-content: left;
}

/* td {
  text-align: center;
}

th {
  text-align: center;
} */
</style>
