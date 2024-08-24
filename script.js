const totalHarga = document.getElementById('totalHarga');
const ongkir = document.getElementById('ongkir');
const bayar = document.getElementById('bayar');

const promoCode = document.getElementById('promoCode');


promoCode.addEventListener('input',function(){
    console.log(promoCode.value)
    if(promoCode.value === "GRATISONGKIR"){
        ongkir.innerHTML = 0;
        totalHargaBayar();
    }});

totalHarga.innerHTML = 0;

function totalHargaBayar(){
    let total = 0
    const productPay = document.querySelectorAll('.pay');
    if(productPay.length > 0){
        productPay.forEach(e=>{
            const hargaBarang = parseInt(e.querySelector('p').innerHTML.replace(/[^\d]/g, ''));
            
            const jumlahBarang = parseInt((e.querySelector('input[type="text"]').value ?? 0));
            total += hargaBarang * jumlahBarang
            if(promoCode.value !== "GRATISONGKIR"){
                ongkir.innerHTML = `Rp 30000`;
            }
            
        });
    }else{
        total = 0;
        ongkir.innerHTML = `Rp 0`;
    }
    
    totalHarga.innerHTML = `Rp ${total}`;
     
    bayar.innerHTML =`Rp ${parseFloat(totalHarga.innerHTML.replace(/[^\d]/g, '')) + parseFloat(ongkir.innerHTML.replace(/[^\d]/g, ''))}`;
}




const checkProduct = document.querySelectorAll('input[type="checkbox"]');

checkProduct.forEach(e=>{
    e.addEventListener('change',function(e){
        const index = e.target;
        const jumlahBarangInput = index.nextElementSibling.querySelector('input[type="text"]')
        const descBarang = index.nextElementSibling.querySelector('.desc');
        jumlahBarangInput.value = 0;
        if(index.checked){
            descBarang.className = descBarang.className += " pay";
            jumlahBarangInput.value = parseInt(jumlahBarangInput.value) + 1;
            jumlahBarangInput.addEventListener('change',function(){
                totalHargaBayar()
            })
            totalHargaBayar();
            
        }
        else{
            descBarang.className = "desc"
            jumlahBarangInput.value = 0;
            totalHargaBayar();
        }
    })
})