
document.addEventListener('DOMContentLoaded', function(){

  // =======================
  // Sepet İşlemleri
  // =======================
  function updateCartUI(){
    const sepetSpans = document.querySelectorAll('.sepet span');
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    sepetSpans.forEach(span => span.textContent = cart.length);

    const cartContainer = document.getElementById('cart-container');
    const emptyMsg = document.getElementById('emptyMsg');
    const totalPriceEl = document.getElementById('totalPrice');

    if(cartContainer){
      cartContainer.innerHTML="";
      if(cart.length===0){
        emptyMsg.style.display="block";
        totalPriceEl.textContent="";
      } else {
        emptyMsg.style.display="none";
        let total = 0;
        cart.forEach((item,index)=>{
          total += item.price;
          const div = document.createElement('div');
          div.className = "cart-item";
          div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div>
              <h4>${item.name}</h4>
              <p>${item.price} TL</p>
            </div>
            <button onclick="removeFromCart(${index})">X</button>
          `;
          cartContainer.appendChild(div);
        });
        totalPriceEl.textContent = "Toplam: "+total+" TL";
      }
    }
  }

  window.removeFromCart = function(index){
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    cart.splice(index,1);
    localStorage.setItem("cartItems",JSON.stringify(cart));
    updateCartUI();
  }

  updateCartUI();

  // =======================
  // Ödeme Butonu Cart.html
  // =======================
  const checkoutBtn = document.getElementById("checkoutBtn");
  if(checkoutBtn){
      checkoutBtn.addEventListener("click", function(){
          let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
          if(cart.length === 0){
              alert("Sepetiniz boş!");
          } else {
              window.location.href = "payment.html";
          }
      });
  }

  // =======================
  // Ödeme İşlemi Payment.html
  // =======================
  const payBtn = document.getElementById("payBtn");
  if(payBtn){
      payBtn.addEventListener("click", function(){
          alert("Ödemeniz başarılı! Teşekkürler.");
          localStorage.removeItem("cartItems");
          window.location.href = "coffee.html";
      });
  }

  // =======================
  // Ürünler Listesi
  // =======================
  const products = [
    {name:"Iced White Mocha", price:999, category:"soguk", img:"images/Iced White Mocha.jpg", desc:"Soğuk beyaz çikolatalı mocha."},
    {name:"Iced Caramel Latte", price:900, category:"soguk", img:"images/Iced Caramel Latte.jpg", desc:"Karamelli buzlu latte."},
    {name:"Iced Vanilla Latte", price:995, category:"soguk", img:"images/Iced Vanilla Latte.jpg", desc:"Vanilyalı buzlu latte."},
    {name:"Iced Honey Latte", price:1100, category:"soguk", img:"images/Iced Honey Latte.jpg", desc:"Bal aromalı buzlu latte."},
    {name:"Coffee Lemonade", price:700, category:"soguk", img:"images/Coffee Lemonade.jpg", desc:"Limonlu soğuk kahve."},
    {name:"Cold Brew Mocha", price:900, category:"soguk", img:"images/ıced Brew Mocha.jpg", desc:"Çikolatalı cold brew."},
    {name:"Iced Chocolate", price:999, category:"soguk", img:"images/Iced Chocolate.jpg", desc:"Buzlu çikolatalı içecek."},
    {name:"Iced Matcha Latte", price:1599, category:"soguk", img:"images/Iced Matcha Latte.jpg", desc:"Buzlu matcha latte."},
    {name:"Iced Pistachio Latte", price:959, category:"soguk", img:"images/Iced Pistachio Latte.jpg", desc:"Fıstıklı soğuk latte."},
    {name:"Frappe Mocha", price:999, category:"soguk", img:"images/Frappe Mocha.jpg", desc:"Buzlu çikolatalı frappe."},

    {name:"Mix Çikolata Paket", price:1800, category:"tatli", img:"images/mix çikolata.jpg", desc:"Bademli ve sütlü karışık mini çikolatalar."},
    {name:"Mini Bitter Çikolata", price:1000, category:"tatli", img:"images/mini çikolata.jpg", desc:"Yoğun kakao aromalı küçük bitter çikolata parçaları."},
    {name:"Sütlü Baton Çikolata", price:1300, category:"tatli", img:"images/baton çikolata.jpg", desc:"Hafif ve kremamsı sütlü çikolata batonlar."},
    {name:"Fındıklı Mini Çikolata", price:1700, category:"tatli", img:"images/fındıklı çikolata.jpg", desc:"Kavrulmuş fındık parçalı küçük çikolata kareleri."},
    {name:"Bademli Çikolata Parçaları", price:2600, category:"tatli", img:"images/bademli çikolata.jpg", desc:"İnce badem dilimli sütlü çikolata parçaları."},
    {name:"Karamelli Dolgu Çikolata", price:200, category:"tatli", img:"images/Karamelli Dolgu Çikolata.jpg", desc:"İçinde yumuşak karamel dolgusu bulunan mini çikolatalar."},
    {name:"Beyaz Çikolata Küpleri", price:1900, category:"tatli", img:"images/beyaz çikolata.jpg", desc:"Vanilya aromalı beyaz çikolata kareleri."},
    {name:"Antep Fıstıklı Küçük Bar", price:2800, category:"tatli", img:"images/antep f çikolata.jpg", desc:"Antep fıstığı parçalı mini çikolata barları."},
    {name:"Pralin Dolgulu Mini Çikolata", price:2500, category:"tatli", img:"images/Pralin Dolgulu çikolata.jpg", desc:"Fındık kremalı yumuşak dolgulu mini pralin çikolatalar."},
    {name:"Çilek Aromalı Çikolata", price:2600, category:"tatli", img:"images/çilek çikolata.jpg", desc:"Hafif çilek aromalı meyvemsi mini çikolatalar."},

    {name:"Sütlü Kahve", price:1199, category:"sicak", img:"images/sütlü kahve.jpg", desc:"Lezzetli sütlü kahve."},
    {name:"Klasik Kahve", price:699, category:"sicak", img:"images/klasik kahve.jpg", desc:"Klasik kahve tadı."},
    {name:"Kakule Kahve", price:700, category:"sicak", img:"images/kakule kahve.jpg", desc:"Kakule aromalı kahve."},
    {name:"Çekirdek Kahve", price:499, category:"sicak", img:"images/çekirdek kahve.jpg", desc:"Taze çekirdek kahve."},
    {name:"Dibek Kahvesi", price:600, category:"sicak", img:"images/dibek kahve.jpg", desc:"Geleneksel Dibek kahvesi."},
    {name:"Mocha", price:899, category:"sicak", img:"images/mocha kahve.jpg", desc:"Çikolatalı mocha kahve."},
    {name:"Latte", price:899, category:"sicak", img:"images/latte kahve.jpg", desc:"Yumuşak latte tadı."},
    {name:"Cappuccino", price:899, category:"sicak", img:"images/cappuccino kahve.jpg", desc:"Köpüklü cappuccino."},
    {name:"Macchiato", price:799, category:"sicak", img:"images/macchiato kahve.jpg", desc:"Espresso bazlı Macchiato."},
    {name:"Americano", price:799, category:"sicak", img:"images/americano kahve.jpg", desc:"Americano kahve tadı."},
    {name:"Doppio", price:1000, category:"sicak", img:"images/doppio kahve.jpg", desc:"Yoğun espresso Doppio."},
    {name:"Espresso", price:800, category:"sicak", img:"images/espresso kahve.jpg", desc:"Klasik Espresso."},
    {name:"Flat White", price:1200, category:"sicak", img:"images/flat white kahve.jpg", desc:"Sütlü Flat White."},
    {name:"Coffee Ghaida", price:1500, category:"ozel", img:"images/coffee ghaida1.png", desc:"Özel Coffee Ghaida lezzeti."},
    {name:"Black Eye", price:1900, category:"ozel", img:"images/black kahve.jpg", desc:"Çok güçlü kahve."},
    {name:"Brevet", price:1649, category:"ozel", img:"images/brevet kahve.jpg", desc:"Özel Brevet kahve."},
    {name:"Cafe Bombon", price:1800, category:"ozel", img:"images/bombon kahve.jpg", desc:"Tatlı bombon kahve."},
    {name:"Cafe de Olla", price:1700, category:"ozel", img:"images/de olla kahve.jpg", desc:"Baharatlı özel kahve."},

    {name:"Crema", price:999, category:"sicak", img:"images/crema kahve.jpg", desc:"Yumuşak Crema kahve."},
    {name:"Gibraltar", price:800, category:"sicak", img:"images/türk kahve.jpg", desc:"Kültürden Doğan Lezzet."},
    {name:"Kyoto Cold Brew", price:1500, category:"sicak", img:"images/kyoto kahve.jpg", desc:"Geleneksel tat, modern kahve deneyimi."}
  ];

  const container = document.getElementById('productsContainer');

  // =======================
  // Ürün Gösterme Fonksiyonu
  // =======================
  function displayProducts(filter="all"){
    if(!container) return;
    container.innerHTML="";

    let filtered = (filter==="all") ? products : products.filter(p => p.category === filter);

    filtered.forEach(p=>{
      const card = document.createElement('div');
      card.className="product-card";
      card.innerHTML=`
        <div class="card-inner">
          <div class="card-front">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.price} TL</p>
          </div>
          <div class="card-back">
            <p>${p.desc}</p>
            <button class="order-btn">Sipariş Et</button>
          </div>
        </div>`;
      container.appendChild(card);

      card.querySelector(".order-btn").addEventListener("click",()=>{
        let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
        cart.push({name:p.name, price:p.price, img:p.img});
        localStorage.setItem("cartItems",JSON.stringify(cart));
        updateCartUI();
        alert(`${p.name} sepete eklendi!`);
      });
    });
  }

  displayProducts();

  document.querySelectorAll('.category-btn').forEach(btn=>{
    btn.addEventListener('click',()=> displayProducts(btn.dataset.category));
  });

  // =======================
  // Ürün Arama
  // =======================
  const searchInput = document.getElementById("searchInput");

  if(searchInput){
    searchInput.addEventListener("input", function(){
      let value = this.value.toLowerCase().trim();

      let filtered = products.filter(p => 
        p.name.toLowerCase().includes(value) ||
        p.desc.toLowerCase().includes(value)
      );

      container.innerHTML = "";
      
      filtered.forEach(p=>{
        const card = document.createElement('div');
        card.className="product-card";
        card.innerHTML=`
          <div class="card-inner">
            <div class="card-front">
              <img src="${p.img}" alt="${p.name}">
              <h3>${p.name}</h3>
              <p>${p.price} TL</p>
            </div>
            <div class="card-back">
              <p>${p.desc}</p>
              <button class="order-btn">Sipariş Et</button>
            </div>
          </div>`;
        container.appendChild(card);

        card.querySelector(".order-btn").addEventListener("click",()=>{
          let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
          cart.push({name:p.name, price:p.price, img:p.img});
          localStorage.setItem("cartItems",JSON.stringify(cart));
          updateCartUI();
          alert(`${p.name} sepete eklendi!`);
        });
      });
    });
  }

});