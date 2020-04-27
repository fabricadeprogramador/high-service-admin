<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="empresa"
    class="elevation-1"
     >


    <template v-slot:top>


      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-form v-model="valid">
            <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.nome" :readonly="readonly"
                    :rules="nomeRules" 
                    :counter="25"
                    label="Nome"
                    required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">


                    <v-text-field v-model="editedItem.senha" :readonly="readonly"
                    :rules="senhaRules"
                    :counter="25"
                    label="Senha"
                    type="password"
                    required></v-text-field>
                  </v-col>
                 
           
                  <v-col cols="12" sm="6" md="4">
                    <v-select v-model="editedItem.papel"
                    :items= "Papel"
                    :rules= "[v => !!v || 'Selecione um status' ]"
                    label= "Papel"
                    required></v-select>
                  </v-col>
                </v-row>
            </v-container>
          </v-form>
        </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              
              <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>

            <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
            
            </v-card-actions>
          </v-card>
        



     
    </template>
    <template v-slot:item.acoes="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-magnify</v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
     
      modal: false,
      dialog: false,
      readonly: false,
      headers: [
         {
            text: 'Usuarios',
            align: 'start',
            sortable: false,
            value: 'nome',
          },
{ text: 'Papel', value: 'papel' },

{ text: 'Ações', value: 'acoes', sortable: false },
],
      

      papel: ['Funcional','Adm'],
      desserts: [],
      editedIndex: -1,
      
      editedItem: {
        name: '',
        senha: '',
        papel: '',
      },

      defaultItem: {
        name: '',
        senha:'',
        papel: '',
        
      },

        nomeRules: [
          v=> !!v || 'Nome é Obrigatório',
          v=> v.length <= 25 || 'Requer menos de 25 caracteres'
        ],

        senhaRules: [
          v=> !!v || 'Senha é Obrigatório',
          v=> v.length <= 25 || 'Requer menos de 25 caracteres'
        ],

        papelRules: [
          v=> !!v || 'Valor Obrigatório'
        ],

        

    }),

  computed: {
formTitle () {
return this.editedIndex === -1 ? 'Novo Usuario' : 'Edite Usario'
},
},

    watch: {
      dialog (val) {
        val || this.close()
      },
     
    },

 created () {
this.initialize()
},

    methods: {
initialize () {
this.desserts = [
{
nome: 'JAO',
papel: 'Adm',


},
{
nome: 'JAO',
papel: 'Funcional',


},
{
nome: 'JAO',
papel: 'Adm',


},
{
nome: 'JAO',
papel: 'Adm',


},
{
nome: 'Jones',
papel: 'Adm',


},
{
nome: 'Jhonne',
papel: 'Adm',


},
{
nome: 'Jhon',
papel: 'Adm',


},
{
nome: 'Ruan',
papel: 'Adm',


},
{
nome: 'Luan',
papel: 'Adm',


},
{
nome: 'Juan',
papel: 'Adm',


},
]
},

editItem (item) {
this.editedIndex = this.desserts.indexOf(item)
this.editedItem = Object.assign({}, item)
this.dialog = true
},

deleteItem (item) {
const index = this.desserts.indexOf(item)
confirm('Deseja realmente deletar esse item') && this.desserts.splice(index, 1)
},

close () {
this.dialog = false
setTimeout(() => {
this.editedItem = Object.assign({}, this.defaultItem)
this.editedIndex = -1
}, 300)
},

save () {
if (this.editedIndex > -1) {
Object.assign(this.desserts[this.editedIndex], this.editedItem)
} else {
this.desserts.push(this.editedItem)
}
this.close()
},
},
}
</script>


