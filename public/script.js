console.log('made by Gerrit Maatkamp');


var PRICE = 9.99;
var LOAD_NUM = 10;

Vue.filter('capitalize', function (value) {
    if (!value) return '';
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  el: '#app',
  data: {
    total: 0,
    items: [],
    cart: [],
    results: [],
    amount: 0,
    newSearch: 'football',
    lastSearch: '',
    loading: false,
    price: PRICE,
    cartOpen: false,
  },
  methods: {
    showCart: function () {
        if (!this.cartOpen) {
          this.cartOpen = true;
        } else {
          this.cartOpen = false;
        }
    },
    onSubmit:function () {
      this.items = [];
      this.loading = true;
      this.$http
      .get('/search/'.concat(this.newSearch))
      .then(function (res) {
        this.lastSearch = this.newSearch;
          this.results = res.data;
          this.items = res.data.slice(0,LOAD_NUM);
          this.loading = false;
          console.log(res.data);
      });
    },
    addItem: function(index) {
      var item = this.items[index];
      this.total += PRICE;
      this.amount++;
      var found = false;
      for (var i = 0; i < this.cart.length; i++){
        if (this.cart[i].id === item.id) {
          found = true;
          this.cart[i].qty++;
          break;
        }
      }
      if(!found){
        this.cart.push({
          id: item.id,
          title: item.title,
          qty: 1,
          price: PRICE
        });

      }
      console.log(this.cart.length);
    },
    inc: function(item) {
      console.log(item);
      item.qty++;
      this.total += PRICE;
    },
    dec: function(item) {
      console.log(item);
      item.qty--;
      this.total -= PRICE;
      if(item.qty <= 0) {
        for(var i = 0; i < this.cart.length; i++) {
          if (this.cart[i].id === item.id) {
            this.cart.splice(i,1);
            break;
          }
        }
      }
    }
  },
  filters: {
    currency: function(price) {
      return '$'.concat(price.toFixed(2));
    },
    shorten: function(value) {
      return value.substring(0,15);
    },
  },
  mounted: function () {
    this.onSubmit();
  }
});

console.log(scrollmonitor);
