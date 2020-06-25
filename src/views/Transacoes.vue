
<template>
  <v-data-table
    :headers="headers"
    :items="transacoesMostradas"
    :search="search"
    sort-by="data">
    
    <template v-slot:body="{ items }">
      <tbody>
        <tr v-for="item in items" :key="item.empresa">         
          <td v-bind:class="{ transacaoInativa: !item.ativo }">{{ item.empresa }}</td>
          <td v-bind:class="{ transacaoInativa: !item.ativo }">{{item.cliente}}</td>
          <td v-bind:class="{ transacaoInativa: !item.ativo }"><money v-model=item.valor v-bind="money" readonly=true></money></td>
          <td v-bind:class="{ transacaoInativa: !item.ativo }">{{item.data}}</td>
          <td v-bind:class="{ transacaoInativa: !item.ativo }">{{item.status}}</td>
          <td>
            <v-icon size="20" class="mr-2" @click="editItem(item)" v-bind:title="messageVisuzalizar">mdi-magnify</v-icon>
            <v-icon v-if="item.ativo" size="20" @click="ativarDesativarTransacao(item)" v-bind:title="messageDisable">mdi-close</v-icon>
            <v-icon v-if="!item.ativo" size="20" color="red" @click="ativarDesativarTransacao(item)" v-bind:title="messageEnable">mdi-cancel</v-icon>
          </td>
        </tr>
      </tbody>
    </template>
    
    <template v-slot:top>
      <div >
        <v-row >
          <v-col cols="2">
            <v-subheader>Total Transaçoes: </v-subheader>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="totalDeTransacoes" readonly></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="2" align-self="center">
            <v-subheader>Total Gerado: </v-subheader>
          </v-col>
          <v-col cols="2" align-self="center">
            <money v-model="totalGerado" v-bind="money" readonly=true></money>
          </v-col>
          <v-col cols="3"></v-col>
        </v-row>
        <v-row >
          <v-col cols="2">
            <v-subheader>Valor Total das Transações: </v-subheader>
          </v-col>
          <v-col cols="2">
            <money v-model="valorTotalTransacoes" v-bind="money" readonly=true></money>
          </v-col>
        </v-row>
      </div>
      <v-toolbar flat color="dark-grey">
      <v-switch v-model="switch1" label="Mostrar Inativos"></v-switch>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6" md="4">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
       <v-dialog v-model="dialog" max-width="500px" overlay-color="grey">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">
            <v-icon dark  v-on="on" v-bind:title="messageNewAdd">mdi-plus</v-icon>
          </v-btn> 
        </template>
     
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.empresa" :readonly="readonly"
                    :rules="empresaRules" 
                    :counter="25"
                    label="Empresa"
                    required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.cliente" :readonly="readonly"
                    :rules="clienteRules"
                    :counter="25"
                    label="Cliente"
                    required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <label>Valor</label>
                     <money v-model="editedItem.valor" v-bind="money" :readonly="readonly" :rules="valorRules" required></money>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="editedItem.data" 
                      width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="editedItem.data" 
                        label="Data"
                        v-on="on"
                        :rules= "[v => !!v || 'Selecione uma Data' ]"
                        readonly
                      ></v-text-field>
                    </template>
                    <v-date-picker :readonly="readonly" v-model="date" >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.dialog.save(dateFormatted)" :disabled="readonly">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select v-model="editedItem.status"
                    :items= "status"
                    :rules= "[v => !!v || 'Selecione um status' ]"
                    label= "Status"
                    :readonly = "readstatus"
                    required></v-select>
                  </v-col>
                </v-row>
            </v-container>
          </v-form>
        </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
  import {Money} from 'v-money'

  import TransacaoRequestUtil from "@/util/request-utils/TransacaoRequestUtil";

  export default {
    components: {Money},

    data: vm => ({
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      modal: false,
      valid: true,
      dialog: false,
      readonly: false,
      readstatus: false,
      search: '',
      switch1: false,
      money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          suffix: '',
          precision: 2,
          masked: false,
        },
      headers: [
        { text: 'Empresa', value: 'empresa',},
        { text: 'Cliente', value: 'cliente' },
        { text: 'Valor (R$)', value: 'valor'},
        { text: 'Data', value: 'data'},
        { text: 'Status', value: 'status' },
        { text: 'Ações', value: 'acoes', sortable: false },
      ],
      status: ['Aberto','Em Andamento', 'Pendente', 'Concluído'],
      transacoes: [],
      editedIndex: -1,
      valorTotalTransacoes: 0,
      totalGerado:0,
      totalDeTransacoes:0,
      messageDisable :'Desativar Transação',
      messageEnable: 'Ativar Transação',
      messageVisuzalizar:'Visualizar Transação',
      messageNewAdd:'Novo Cadastro',

      editedItem: {
        empresa: '',
        cliente: '',
        valor: 0,
        data: '',
        status: '',
        ativo: Boolean,
      },

      defaultItem: {
        empresa: '',
        cliente: '',
        valor: 0,
        data: '',
        status: '',
        ativo: Boolean,
      },

        empresaRules: [
          v=> !!v || 'Empresa Obrigatório',
          v=> v.length <= 25 || 'Requer menos de 25 caracteres'
        ],

        clienteRules: [
          v=> !!v || 'Cliente Obrigatório',
          v=> v.length <= 25 || 'Requer menos de 25 caracteres'
        ],

        valorRules: [
          v=> !!v || 'Valor Obrigatório'
        ],

    }),

    computed: {
      formTitle () {
        return this.editedIndex == -1 ? 'Cadastrar Transação' : 'Alterar Status'
      },
       transacoesMostradas : function() {
         if(!this.switch1){
           return this.transacoes.filter(function(u) {
             return u.ativo
         })
         }
         else
          return this.transacoes
     }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        TransacaoRequestUtil.buscarTodos().then((transacao) => {
          this.transacoes = transacao;
          this.balancoTotal()
        });
      },

      balancoTotal() {
        this.valorTotalTransacoes = 0

        for (let i = 0; i < this.transacoes.length; i++) {
          this.valorTotalTransacoes += parseInt(this.transacoes[i].valor);
        }

        this.totalDeTransacoes = this.transacoes.length

        this.totalGerado = parseFloat((this.valorTotalTransacoes * 0.01).toFixed(2))

      },

      editItem (item) {
        this.dialog = true
        this.readonly = true
        if(!item.ativo)
          this.readstatus = true
        this.editedIndex = this.transacoes.indexOf(item)
        this.editedItem = Object.assign({}, item)
      },

     recarregaTransacao() {
      TransacaoRequestUtil.buscarTodos().then(transacao => {
        this.transacoes = transacao;
      });
    },

      ativarDesativarTransacao(item) {
        let resp = ""
        if(item.ativo)
          resp = confirm("Tem certeza que deseja desativar essa transação?") 
        else
          resp = confirm("Tem certeza que deseja reativar essa transação?") 
        
        if(resp){
          //item.ativo = !item.ativo
           TransacaoRequestUtil.ativardesativar(item).then((editedItem) => {
             this.recarregaTransacao();
            }); 
        }

      },

      close () {
        this.dialog = false
        this.readonly = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.resetValidation()
        }, 300)
        this.recarregaTransacao();
      },

      async save () {
        if(this.editedItem.empresa != "" && this.editedItem.cliente != "" && this.editedItem.valor != 0 && this.editedItem.data != null && this.editedItem.status != ""){
          if (this.editedIndex > -1) {
              await TransacaoRequestUtil.editar(this.editedItem).then(res => {
                 alert(JSON.stringify(res));
              this.recarregaTransacao();
            });
          }
            //Object.assign(this.transacoes[this.editedIndex], this.editedItem)
          else {
            this.editedItem.ativo = true
           // this.transacoes.push(this.editedItem)
            await TransacaoRequestUtil.salvar(this.editedItem).then((editedItem) => {
              //alert(JSON.stringify(this.editedItem));
              this.recarregaTransacao();
            });
          }
        this.close();
        this.reset();
        }
      },
      resetValidation(){
        this.$refs.form.resetValidation()
        this.date = new Date().toISOString().substr(0, 10)
        this.readstatus = false
      },

      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },

    },
  }
</script>

<style>
.transacaoInativa {
  color: #454547;
}
</style>
