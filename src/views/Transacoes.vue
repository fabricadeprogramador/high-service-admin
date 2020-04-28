
<template>
  <v-data-table
    :headers="headers"
    :items="transacoes"
    sort-by="empresa">
    
    <template v-slot:body="{ items }">
      <tbody>
        <tr v-for="item in items" :key="item.empresa">         
          <td>{{ item.empresa }}</td>
          <td>{{item.cliente}}</td>
          <td><money v-model=item.valor v-bind="money" readonly=true></money></td>
          <td>{{item.data}}</td>
          <td>{{item.status}}</td>
          <td>
            <v-icon small class="mr-2" @click="editItem(item)">mdi-magnify</v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete</v-icon>
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
      <v-spacer></v-spacer>
       <v-dialog v-model="dialog" max-width="500px" overlay-color="grey">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark  v-on="on" @click="resetValidation">
            <v-icon dark  v-on="on" v-bind:title="messageNewAdd">mdi-account-plus</v-icon>
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
                      width="250px">
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="computedDateFormatted" 
                        label="Data"
                        v-on="on"
                        :rules= "[v => !!v || 'Selecione uma Data' ]"
                      ></v-text-field>
                    </template>
                    <v-date-picker :readonly="readonly" v-model="date" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.dialog.save(dateFormatted)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select v-model="editedItem.status"
                    :items= "status"
                    :rules= "[v => !!v || 'Selecione um status' ]"
                    label= "Status"
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
  export default {
    components: {Money},
    data: vm => ({
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      modal: false,
      dialog: false,
      readonly: false,
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
      messageVisuzalizar:'Visualizar Transação',
      messageNewAdd:'Novo Cadastro',

      editedItem: {
        empresa: '',
        cliente: '',
        valor: 0,
        data: '',
        status: '',
      },

      defaultItem: {
        empresa: '',
        cliente: '',
        valor: 0,
        data: '',
        status: '',
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
       computedDateFormatted () {
        return this.formatDate(this.date)
      },
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
      this.balancoTotal()
    },

    methods: {
      initialize () {
        this.transacoes = [
          {
            empresa: 'Empresa 1',
            cliente: 'Ana Carla Silva',
            valor: 2500.00,
            data: '18/04/2020',
            status: 'Em Andamento',
          },
          {
            empresa: 'Empresa 2',
            cliente: 'José Francisco Cooper',
            valor: 5700.00,
            data: '19/04/2020',
            status: 'Concluído',
          },
        ]
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
        this.editedIndex = this.transacoes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        this.readonly = true
      },

      deleteItem (item) {
        const index = this.transacoes.indexOf(item)
        confirm('Tem certeza que deseja deletar essa transação?') && this.transacoes.splice(index, 1)
        this.balancoTotal()
      },

      close () {
        this.dialog = false
        this.readonly = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if(this.editedItem.empresa != "" && this.editedItem.cliente != "" && this.editedItem.valor != 0 && this.editedItem.data != "" && this.editedItem.status != ""){
          if (this.editedIndex > -1) {
            Object.assign(this.transacoes[this.editedIndex], this.editedItem)
          }
          else {
            this.transacoes.push(this.editedItem)
          }
        this.balancoTotal()
        this.close()
        }
      },

      resetValidation(){
        this.$refs.form.resetValidation()
      },

      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
    },
  }
</script>
