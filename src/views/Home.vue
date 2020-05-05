<template>
  <v-responsive
    class="overflow-y-auto"
  >
    <div class="pa-6 text-center">
      <img src="../assets/logo_hs.svg" height="100px">
    </div>

    <v-responsive
      class="text-center pa-2"
    >
      <v-container>
       <v-row>
         <v-col cols=6 md=7 sm="12">
           <v-carousel hide-delimiter-background show-arrows-on-hover >
              <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item.src"
                reverse-transition="fade-transition"
                transition="fade-transition"
              >
              <v-row  class="fill-height"  align="center" justify="center">
                <div class="display-2 font-weight-black">
                  <div class="orangelighten-1--text">{{ item.title }}</div>
                </div>
              </v-row>
              </v-carousel-item>
            </v-carousel>
         </v-col>
         <v-col cols=6 md=5 sm=12 class="align-self-center">
           <div class="headline">
             Aumente a rentabilidade do seu negócio com segurança e praticidade
           </div>
         </v-col>
       </v-row>
      </v-container>
      
      <v-responsive min-height="50vh">
        <div class="headline" id="titulo-q2">Evoluímos continuamente para colaborar com nossos clientes e desenvolver novas soluções</div>
        <v-container>
          <v-row>
            <v-col cols="6" md="6" sm="12" class="align-self-center">
              <v-card>
                <v-card-title>Quem Somos</v-card-title>
                <v-card-text>
                  Phasellus magna. Quisque rutrum. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Aliquam lobortis. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.

                  In turpis. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. In turpis. Pellentesque dapibus hendrerit tortor. Ut varius tincidunt libero.
                  Phasellus magna. Quisque rutrum. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Aliquam lobortis. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.

                  In turpis. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. In turpis. Pellentesque dapibus hendrerit tortor. Ut varius tincidunt libero.
                  Phasellus magna. Quisque rutrum. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Aliquam lobortis. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.

                  In turpis. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. In turpis. Pellentesque dapibus hendrerit tortor. Ut varius tincidunt libero.
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6" md="6" sm="12">
              <img src="../assets/team.png" height="500px">
            </v-col>
          </v-row>
        </v-container>
      </v-responsive>

      <v-responsive min-height="50vh">
        <div class="display-1" id="titulo-q2">Depoimentos</div>
        <v-container>
          <v-row>
           <v-col cols="12" md="12" sm="12">
              <v-carousel hide-delimiters hide-delimiter-background show-arrows-on-hover>
                <v-carousel-item> 
                  <v-container>
                    <v-row>
                      <v-item v-for= "(slide,i) in slides" :key="i">
                        <v-col cols="3" md="4" sm="12">
                          <v-sheet height="100%">
                            <v-card > 
                              <v-avatar class="ma-3" size="100" tile>
                                <img :src="slide.src">
                              </v-avatar>
                              <v-card-text v-text= "slide.nome" class="title"></v-card-text>
                              <v-card-text v-text= "slide.descricao"></v-card-text>
                            </v-card>
                          </v-sheet>
                      </v-col>
                      </v-item>
                    </v-row>
                  </v-container>
                </v-carousel-item>
              </v-carousel>

            </v-col>
          </v-row>
        </v-container>
      </v-responsive>

      <v-responsive min-height="50vh">
        <div class="display-1" id="titulo-q2">Nossa Equipe</div>
        <v-container>
          <v-row>
            <v-col cols="6" md="6" sm="12">
              <img src="../assets/equipe.png" height="450px">
            </v-col>
            <v-col></v-col>

            <v-col cols="6" md="5" sm="12">
              <v-carousel hide-delimiters hide-delimiter-background show-arrows-on-hover>
                <v-carousel-item v-for= "(slide,i) in slides" :key="i"> 
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="12" sm="12">
                          <v-card> 
                            <v-avatar class="ma-3" size="100" tile>
                              <img :src="slide.src">
                            </v-avatar>
                            <v-card-text v-text= "slide.nome" class="title"></v-card-text>
                            <v-card-text v-text= "slide.descricao"></v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-carousel-item>
              </v-carousel>

            </v-col>
          </v-row>
        </v-container>
      </v-responsive>

    </v-responsive>
  </v-responsive>
</template>

<script>
  export default {
    data: () => ({
      isActive: false,
    }),
  }
</script>

<script>
  export default {
    data: () =>({
      items: [
          {
            src: 'https://cdn-istoe-ssl.akamaized.net/wp-content/uploads/sites/14/2017/07/d0ee60bfad29fdcb333d77db83cd1f73bab9bfef.jpg',
            title: "Cozinheira",
          },
          {
            src: 'https://blog.mundomidia.com/wp-content/uploads/2017/08/oficina-mecanica.jpg',
            title: "Mecânico",
          },
          {
            src: 'https://s3-sa-east-1.amazonaws.com/triider-blog-files/wp-content/uploads/2018/08/21205927/aplicativo-de-diarista-profissionais-confiaveis.jpg',
            title: "Diarista",
          },
          {
            src: 'https://static1.squarespace.com/static/52a23eaae4b0a695ee3d229c/52a26dade4b0d01d33d741d0/5b2d3b1770a6ad6635ab6619/1529691071826/arquitetura-e-urbanismo+UNIS+Cidades.jpeg?format=1500w',
            title: "Design"
          },
      ],
      slides:[
        {
          nome:'Ellie Goulding',
          src: require('../assets/social-media.svg'),
          descricao: 'Phasellus magna. Quisque rutrum. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Aliquam lobortis. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna In turpis. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. In turpis. Pellentesque dapibus hendrerit tortor. Ut varius tincidunt libero.',
        },
        {
          nome:'Lady Gaga',
          src: require('../assets/social-media.svg'),
          descricao: 'Phasellus magna. Quisque rutrum. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Aliquam lobortis. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna In turpis. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. In turpis. Pellentesque dapibus hendrerit tortor. Ut varius tincidunt libero.',
        },
        {
          nome:'Beyonce',
          src: require('../assets/social-media.svg'),
          descricao: 'Phasellus magna. Quisque rutrum. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Aliquam lobortis. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna In turpis. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. In turpis. Pellentesque dapibus hendrerit tortor. Ut varius tincidunt libero.',
        },
        {
          nome:'Katy Perry',
          src: require('../assets/social-media.svg'),
          descricao: 'Phasellus magna. Quisque rutrum. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Aliquam lobortis. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna In turpis. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. In turpis. Pellentesque dapibus hendrerit tortor. Ut varius tincidunt libero.',
        },
        {
          nome:'Madonna',
          src: require('../assets/social-media.svg'),
          descricao: 'Phasellus magna. Quisque rutrum. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Aliquam lobortis. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna In turpis. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. In turpis. Pellentesque dapibus hendrerit tortor. Ut varius tincidunt libero.',
        },
        {
          nome:'Taylor Swift',
          src: require('../assets/social-media.svg'),
          descricao: 'Phasellus magna. Quisque rutrum. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Aliquam lobortis. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna In turpis. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. In turpis. Pellentesque dapibus hendrerit tortor. Ut varius tincidunt libero.',
        },                    
      ]
    }),
}
</script>

<style>
#titulo-q2{
  margin-top: 5%;
}
</style>