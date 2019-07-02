class ApiInterface {

    constructor($http,$cacheFactory){
        this.http=$http;
        this.cache=$cacheFactory('my-cache', { capacity: 10});
    }

    doGet(url)
    {
        return this.http.get(url,{cache:this.cache});
    }
    doPost(url, data) {
        return this.http.post(url, {data});
    }
    doPut(url, data) {
        return this.http.put(url, {data:data});
    }
    doDelete(url,id) {
        return this.http.delete(`${url} / ${id}`);
    }
}
tvzStore.service('ApiInterface', ApiInterface);