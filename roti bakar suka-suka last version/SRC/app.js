document.addEventListener('alpine:init', () => {
    Alpine.data('produk', () => ({
        items:[
            {id: 1, name: 'cokelat susu',img: 'cokelatsusu.jpg',price:26000},
            {id: 2, name: 'greeen keju roti',img: 'greenkejuroti.jpg',price:16000},
            {id: 3, name: 'green roti',img: 'greenroti.jpg',price:26000},
            {id: 4, name: 'red velvet',img: 'redroti.jpg',price:36000},
            {id: 5, name: 'cokelat susu',img: 'kacangsusu.jpg',price:15000},
            {id: 6, name: 'cokelat susu',img: 'kejucoklat.jpg',price:42000},
        ]
    }));

        Alpine.data('produk-preview', () => ({
            items:[
                {id: 1, name: 'cokelat susu',img: 'cokelatsusu.jpg',price:26000},
                {id: 2, name: 'greeen keju roti',img: 'greenkejuroti.jpg',price:16000},
                {id: 3, name: 'green roti',img: 'greenroti.jpg',price:26000},
                {id: 4, name: 'red velvet',img: 'redroti.jpg',price:36000},
                {id: 5, name: 'cokelat susu',img: 'kacangsusu.jpg',price:15000},
                {id: 6, name: 'cokelat susu',img: 'kejucoklat.jpg',price:42000},
            ]
        }));
    

    


    Alpine.store('cart', {
        items:[],
        total:0,
        quantity:0,
        add(newItem){
            // cek apakah ada barang yang sama di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // jika belum ada
            if(!cartItem){
                this.items.push({...newItem, quantity: 1, total: newItem.price});
                this.quantity++;
                this.total += newItem.price;
            }else{
                // jika barang sudah ada di cart, cek apakah barang beda atau sama dengan yang di cart
                this.items = this.items.map((item) => {
                    // jika barang berberda
                    if(item.id !== newItem.id){
                        return item;
                    }else{
                        //jika barang sudah ada, tambah jumlah dan totalnnya
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                })
            }
        },
        remove(id){
            //ambill item yang mau di remmove berdasarkan id nya chiiiiiii
            const cartItem = this.items.find((item) => item.id === id);

            //jika itemlebih dari satu
            if(cartItem.quantity > 1) {
                //telusuri satu satu
                this.items = this.items.map((item) => {
                    //jika bukan barang yg di klik
                    if(item.id !== id) {
                        return item;
                    }else{
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                });
            } else if (cartItem.quantity == 1) {
                //jika barang sisa satu 1
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        },
    })
});

// konversi rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: "currency",
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
}