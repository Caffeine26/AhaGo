<template>
    <div class="footer">
        <div class="section01">
            <div class="logo">
                <img id="ahagoLogo" src="./../assets/ahago-logo.png" alt="AhaGo-Logo">
            </div>

            <div class="footerActions">
                <div class="gethelp">
                    <a href="">Get Help</a>
                    <a href="">Add your restaurant</a>
                    <a href="">Sign up to deliver</a>
                    <a href="">Create a business account</a>

                    <div class="dropdown" @click="toggleDropdown">
                        <div class="selected">{{ selected || 'Select an option' }}</div>
                        <ul v-show="isOpen" class="options">
                        <li v-for="item in items" :key="item" @click.stop="selectItem(item)">
                            {{ item }}
                        </li>
                        </ul>
                    </div>
                </div>
        
                <div class="gethelp">
                    <a href="">Restaurants near me</a>
                    <a href="">View all cities</a>
                    <a href="">Pickup near me</a>
                    <a href="">About AhaGo</a>
                    <div class="dropdown" @click="toggleDropdown">
                        <div class="selected">{{ selected || 'Select an option' }}</div>
                        <ul v-show="isOpen" class="options">
                        <li v-for="item in items" :key="item" @click.stop="selectItem(item)">
                            {{ item }}
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="section02">
            <div class="medias">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20.9 2H3.1A1.1 1.1 0 0 0 2 3.1v17.8A1.1 1.1 0 0 0 3.1 22h9.58v-7.75h-2.6v-3h2.6V9a3.64 3.64 0 0 1 3.88-4a20 20 0 0 1 2.33.12v2.7H17.3c-1.26 0-1.5.6-1.5 1.47v1.93h3l-.39 3H15.8V22h5.1a1.1 1.1 0 0 0 1.1-1.1V3.1A1.1 1.1 0 0 0 20.9 2"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="currentColor"><path fill-rule="evenodd" d="M12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10m-3 5a3 3 0 1 0 6 0a3 3 0 0 0-6 0" clip-rule="evenodd"/><path d="M18 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2"/><path fill-rule="evenodd" d="M5 1a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4zm14 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2" clip-rule="evenodd"/></g></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 14 14"><g fill="none"><g clip-path="url(#primeTwitter0)"><path fill="currentColor" d="M11.025.656h2.147L8.482 6.03L14 13.344H9.68L6.294 8.909l-3.87 4.435H.275l5.016-5.75L0 .657h4.43L7.486 4.71zm-.755 11.4h1.19L3.78 1.877H2.504z"/></g><defs><clipPath id="primeTwitter0"><path fill="#fff" d="M0 0h14v14H0z"/></clipPath></defs></g></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.705 11.108c-.162-2.987-1.794-4.697-4.534-4.714c-1.652-.01-3.033.69-3.879 1.973L9.8 9.4c.634-.961 1.635-1.16 2.36-1.153c.903.006 1.583.268 2.024.78c.32.372.535.887.642 1.536q-1.202-.204-2.59-.125c-2.606.15-4.28 1.67-4.168 3.781c.057 1.071.59 1.993 1.502 2.595c.77.509 1.764.757 2.795.701c1.363-.075 2.432-.594 3.178-1.545c.566-.722.924-1.658 1.082-2.836c.65.392 1.13.907 1.397 1.527c.452 1.054.478 2.786-.935 4.198c-1.238 1.236-2.726 1.772-4.975 1.788c-2.495-.018-4.382-.819-5.608-2.378c-1.15-1.46-1.743-3.57-1.765-6.269c.022-2.7.616-4.809 1.765-6.27c1.226-1.559 3.113-2.359 5.608-2.377c2.513.019 4.432.822 5.706 2.39c.625.768 1.095 1.734 1.406 2.86l1.766-.47c-.377-1.387-.969-2.582-1.774-3.573c-1.633-2.01-4.033-3.039-7.11-3.06c-3.071.021-5.432 1.055-7.019 3.071c-1.411 1.795-2.14 4.306-2.164 7.436c.024 3.13.753 5.627 2.164 7.422c1.587 2.016 3.96 3.05 7.03 3.071c2.731-.019 4.655-.734 6.24-2.317c2.075-2.073 2.012-4.67 1.329-6.264c-.525-1.225-1.57-2.206-2.98-2.81m-4.438 4.557c-1.142.064-2.328-.448-2.387-1.546c-.043-.814.58-1.722 2.457-1.83a9.4 9.4 0 0 1 2.533.174c-.216 2.702-1.485 3.14-2.603 3.202"/></svg>
            </div>

            <div class="policy">
                <div class="terms">
                    <span>Privacy and Policy</span>
                    <span>Terms and Conditions</span>
                </div>
                <div class="copyright">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.288 9.428A4.999 4.999 0 0 0 7 12a4.999 4.999 0 0 0 9.288 2.572l-1.715-1.028A3 3 0 1 1 12 9c1.093 0 2.05.584 2.573 1.457zM22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10s10-4.48 10-10M4 12c0-4.42 3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8s-8-3.58-8-8"/></svg>
                    <span>2025 AhaGo Co., Ltd</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      items: ['Apple', 'Banana', 'Cherry'],
      selected: '',
      isOpen: false
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectItem(item) {
      this.selected = item;
      this.isOpen = false;
    }
  }
};
</script>

<style scoped>
.footer{
    background-color: #292929;
    /* background-color: black; */
    color: white;
    padding-bottom: 100px;
    padding-left: 150px;
    padding-right: 150px;
    font-family: 'Raleway';
    font-size: 20px;
}
#ahagoLogo{
    width: 180px;
}
a{
    color: white;
    text-decoration: none;
    
    margin-bottom: 15px;
}
.gethelp{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 100px;
    /* background-color: aquamarine; */
}
.dropdown{
    border: 1px white solid;
    border-radius: 5px;
    width: fit-content;
    padding: 10px;
    /* font-family: 'Raleway';
    font-size: 20px; */
}
.footerActions{
    display: flex;
}
.section01{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px #464646 solid;
    padding-top: 50px;
    padding-bottom: 50px;
}
.policy{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.copyright{
    display: flex;
    align-items: center;
    margin-top: 10px;
}
.terms > span {
    margin-left: 20px;
}
.medias svg {
    margin-right: 20px;
}
.section02{
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

</style>