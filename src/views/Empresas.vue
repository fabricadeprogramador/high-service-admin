
<template>
  <v-data-table
    :headers="headers"
    :items="empresas"
    sort-by="empresa">

    <template v-slot:top>
        <v-expand-transition>
            <v-card v-if="novoCadastro">
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>


                <v-form ref="form" v-model="valid">
                    <v-card-text>
                         <v-container>
                            <v-row>
                                <h3 class="ml-3">Dados:</h3>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.empresa"
                                        :rules="campoRules"
                                        label="Nome da Empresa"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.cnpj"
                                        :rules="cnpjRules"
                                        v-mask="['###.###.###-##', '##.###.###/####-##']"
                                        label="CPNJ"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        :rules="emailRules"
                                        v-model="editedItem.email"
                                        label="E-mail"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        :rules="telRules"
                                        v-model="editedItem.telefone"
                                        label="Telefone"
                                        v-mask="['(##) ####-####', '(##) #####-####']"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="mt-7">
                                <h3 class="ml-3">Endereço:</h3>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6" md="5" lg="3">
                                    <v-text-field
                                        :rules="cepRules"
                                        v-mask="'#####-###'"
                                        v-model="editedItem.cep"
                                        label="CEP"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="5" lg="3">
                                    <v-text-field
                                        :rules="campoRules"
                                        v-model="editedItem.rua"
                                        label="Rua:"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="5" lg="3">
                                    <v-text-field
                                        :rules="campoRules"
                                        v-model="editedItem.numero"
                                        label="Número"
                                        type="number"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="5" lg="3">
                                    <v-text-field
                                        v-model="editedItem.complemento"
                                        label="Complemento"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="5" lg="3">
                                    <v-text-field
                                        :rules="campoRules"
                                        v-model="editedItem.bairro"
                                        label="Bairro"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="5" lg="3">
                                    <v-text-field
                                        :rules="campoRules"
                                        v-model="editedItem.cidade"
                                        label="Cidade"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="2" md="2" lg="1" xl="1">
                                    <v-select :rules="campoRules" v-model="editedItem.uf" :items="uf" label="UF"></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="5" lg="3">
                                    <v-text-field
                                        :rules="campoRules"
                                        v-model="editedItem.ramo"
                                        label="Ramo de Atividade"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-layout justify-center>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" dark class="mb-2" @click="save" :disabled="!valid">Salvar</v-btn>
                            <v-btn color="primary" dark class="mb-2" @click="reset">Cancelar</v-btn>
                        </v-card-actions>
                    </v-layout>
                </v-form>
            </v-card>
        </v-expand-transition>

        <v-toolbar flat color="dark-grey">
            <v-toolbar-title>Lista de Empresas</v-toolbar-title>
            <v-spacer></v-spacer>
        <v-btn color="primary" fab dark small @click="mostrarCadastro">
          <v-icon v-if="!novoCadastro" dark v-bind:title="messageNewAdd">mdi-plus</v-icon>
          <v-icon v-if="novoCadastro" dark v-bind:title="msgClose">mdi-minus</v-icon>
        </v-btn>
      </v-toolbar>
    </template>

    <template v-slot:item.empresa="{ item }">
        <tr v-bind:class="{ empresaInativa: !item.ativo }">{{item.empresa}}</tr>
    </template>
    <template v-slot:item.cnpj="{ item }">
        <tr v-bind:class="{ empresaInativa: !item.ativo }">{{item.cnpj}}</tr>
    </template>
    <template v-slot:item.email="{ item }">
        <tr v-bind:class="{ empresaInativa: !item.ativo }">{{item.email}}</tr>
    </template>
    <template v-slot:item.telefone="{ item }">
        <tr v-bind:class="{ empresaInativa: !item.ativo }">{{item.telefone}}</tr>
    </template>

    <template v-slot:item.actions="{ item }">
        <v-icon small @click="cadastrarProduto(item)" v-bind:title="msgCadastrarProduto">mdi-wrench-outline</v-icon>
        <v-icon small @click="abrirMensagens(item)" v-bind:title="msgMensagens">mdi-email-outline</v-icon>
        <v-icon small class="mr-2" @click="visualizaEmpresa(item)" v-bind:title="msgVisualizar">mdi-magnify</v-icon>
        <v-icon v-if="!item.ativo" color="red" small @click="ativarDesativarEmpresa(item)" v-bind:title="messageEnable">mdi-cancel</v-icon>
        <v-icon v-if="item.ativo" small color="green" @click="ativarDesativarEmpresa(item)" v-bind:title="messageDisable">mdi-check-bold</v-icon>
        <v-icon small v-if="item.ativo" @click="editItem(item)" v-bind:title="msnEditar">mdi-pencil</v-icon>

        <v-dialog v-model="dialog" overlay-color="grey">
            <v-card>
                <v-container>
                    <v-row>
                        <h3 class="ml-3">Dados:</h3>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="visualizedtItem.empresa" label="Nome da Empresa" readonly></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="visualizedtItem.cnpj" label="CPNJ" readonly></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="visualizedtItem.email" label="E-mail" readonly></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="visualizedtItem.telefone" label="Telefone" readonly></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="mt-7">
                        <h3 class="ml-3">Endereço:</h3>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="5" lg="3">
                            <v-text-field v-model="visualizedtItem.cep" label="CEP" readonly></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="5" lg="3">
                            <v-text-field v-model="visualizedtItem.rua" label="Rua:" readonly></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="5" lg="3">
                            <v-text-field v-model="visualizedtItem.numero" label="Número" readonly ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="5" lg="3">
                            <v-text-field v-model="visualizedtItem.complemento" label="Complemento" readonly></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="5" lg="3">
                            <v-text-field v-model="visualizedtItem.bairro" label="Bairro" readonly></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="5" lg="3">
                            <v-text-field v-model="visualizedtItem.cidade" label="Cidade" readonly></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="2" md="2" lg="1" xl="1">
                            <v-select v-model="visualizedtItem.uf" :items="uf" label="UF" readonly></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="5" lg="3">
                            <v-text-field v-model="visualizedtItem.ramo" label="Ramo de Atividade" readonly></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </template>

  </v-data-table>
</template>

<script>
  import {mask} from 'vue-the-mask'

  export default {
    directives: {mask},

    data: () => ({
        valid: true,
        readonly: false,
        novoCadastro: false,
        dialog: false,
        headers: [
            { text: 'Empresa', value: 'empresa',},
            { text: 'CNPJ', value: 'cnpj' },
            { text: 'E-mail', value: 'email'},
            { text: 'Telefone', value: 'telefone'},
            { text: 'Ações', value: 'actions', sortable: false },
        ],
        empresas: [],
        editedIndex: -1,
        msgCadastrarProduto: 'Cadastrar Produto',
        messageDisable :'Desativar Empresa',
        messageEnable: 'Ativar Empresa',
        msgVisualizar:'Visualizar Empresa',
        messageNewAdd:'Novo Cadastro',
        msgMensagens: 'Área de Mensagens',
        msnEditar: 'Editar Empresa',
        msgClose: 'Fechar Campos',

        editedItem: {
            empresa: '',
            cnpj: '',
            email: '',
            telefone: '',
            rua: "",
            numero: "",
            complemento: "",
            bairro: "",
            cep: "",
            cidade: "",
            uf: "",
            ramo:"",
            ativo: Boolean,
        },

        defaultItem: {
            empresa: '',
            cnpj: '',
            email: '',
            telefone: '',
            rua: "",
            numero: "",
            complemento: "",
            bairro: "",
            cep: "",
            cidade: "",
            uf: "",
            ramo:"",
            ativo: Boolean,
        },

        visualizedtItem: {
            empresa: '',
            cnpj: '',
            email: '',
            telefone: '',
            rua: "",
            numero: "",
            complemento: "",
            bairro: "",
            cep: "",
            cidade: "",
            uf: "",
            ramo:"",
            ativo: Boolean,
        },

        uf: ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO"
        ],

        campoRules: [v => !!v || "Campo obrigatório"],
        emailRules: [(v) => /.+@.+\..+/.test(v) || "Digite um e-mail válido"],
        cnpjRules: [v => (!!v && v.length >= 14 && v.length <= 18) || "CPF ou CNPJ deve ser válido"],
        telRules: [v => (!!v && v.length >= 14) || "Digite telefone com DDD"],
        cepRules: [v => (!!v && v.length == 9) || "Digite o CEP com 8 dígitos"],
    }),

    computed: {
        formTitle () {
            return this.editedIndex == -1 ? 'Cadastrar Empresa' : 'Editar dados da Empresa'
            },
        },

        created () {
            this.initialize()
    },

    methods: {
        initialize () {
            this.empresas = [
            {
                empresa: 'Empresa 1',
                cnpj: '11122233344455',
                email: 'empresa1@empresa1.com.br',
                telefone: '6733334444',
                ativo: true
            },
            {
                empresa: 'Empresa 2',
                cnpj: '11122233344456',
                email: 'empresa2@empresa2.com.br',
                telefone: '6733334444',
                ativo: true
            },]
    },

        editItem (item) {
            this.novoCadastro = true
            this.editedIndex = this.empresas.indexOf(item)
            this.editedItem = Object.assign({}, item)
        },

        ativarDesativarEmpresa(item) {
            let resp = ""
            if(item.ativo)
                resp = confirm("Tem certeza que deseja desativar essa empresa?") 
            else
                resp = confirm("Tem certeza que deseja reativar essa empresa?") 

            if(resp){
                item.ativo = !item.ativo
            }
        },

        mostrarCadastro() {
            this.novoCadastro = !this.novoCadastro;
            this.reset()
        },

        visualizaEmpresa(item) {
            this.visualizedtItem = Object.assign({}, item);
            this.dialog = true
        },

        close() {
            this.novoCadastro = false
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            this.reset()
        },

        save () {
            alert(JSON.stringify(this.editedItem));
            if (this.editedIndex > -1) {
                Object.assign(this.empresas[this.editedIndex], this.editedItem)
            }
            else {
                this.editedItem.ativo = true
                this.empresas.push(this.editedItem)
            }
            this.close()
        },

        reset(){
            this.$refs.form.reset();
            this.novoCadastro = false
        },
    },
}
</script>

<style>
.empresaInativa {
  color: #454547;
}
</style>
