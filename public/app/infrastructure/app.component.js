tvzStore.component('store',{

    template:`
    <nav-bar></nav-bar>
    <div class="col-md-9" ui-view></div>
    <footer>
        <p>Footer</p>
    </footer>
    `,
    controller:function(){
        console.log("TEST");
    }
})