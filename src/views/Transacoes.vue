<template>
  <v-simple-table dark>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">Empresa</th>
          <th class="text-center">Cliente</th>
          <th class="text-center">Valor</th>
          <th class="text-center">Data</th>
          <th class="text-center">Status</th>
          <th class="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in transacao" :key="item.empresa">
          <td class="text-center">{{ item.empresa }}</td>
          <td class="text-center">{{ item.cliente }}</td>
          <td class="text-center">{{ item.valor }}</td>
          <td class="text-center">{{ item.data }}</td>
          <td class="text-center">{{ item.status }}</td>
          <td class="text-center">{{ item.acoes }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  export default {
    data () {
      return {
        transacao: [
          {
            empresa: 'Empresa 1',
            cliente: 'Ana Carla Silva',
            valor: 'R$ 2500.00',
            data: '18/04/2020',
            status: 'Em Andamento',
            acoes: ''
          },
          {
            empresa: 'Empresa 2',
            cliente: 'José Francisco Cooper',
            valor: 'R$ 5700.00',
            data: '19/04/2020',
            status: 'Concluído',
            acoes: ''
          }
        ],
      }
    },
  }
</script>
