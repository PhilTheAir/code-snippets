Date.prototype.yyyymmdd = Date.prototype.yyyymmdd || function() {
    var yyyy = this.getFullYear();
    var mm = ('0' + (this.getMonth() + 1)).slice(-2);
    var dd  = ('0' + this.getDate()).slice(-2);
    return yyyy + mm + dd;
};

Date.prototype.yyyy_mm_dd = Date.prototype.yyyy_mm_dd || function() {
    var yyyy = this.getFullYear();
    var mm = ('0' + (this.getMonth() + 1)).slice(-2);
    var dd  = ('0' + this.getDate()).slice(-2);
    return yyyy + '-' + mm + '-' + dd;
};

Date.prototype.yyyysmmsdd = Date.prototype.yyyysmmsdd || function() {
    var yyyy = this.getFullYear();
    var mm = ('0' + (this.getMonth() + 1)).slice(-2);
    var dd  = ('0' + this.getDate()).slice(-2);
    return yyyy + '/' + mm + '/' + dd;
};

Date.prototype.mmddyyyy = Date.prototype.mmddyyyy || function() {
    var yyyy = this.getFullYear();
    var mm = ('0' + (this.getMonth() + 1)).slice(-2);
    var dd  = ('0' + this.getDate()).slice(-2);
    return mm + dd + yyyy;
};

Date.prototype.mm_dd_yyyy = Date.prototype.mm_dd_yyyy || function() {
    var yyyy = this.getFullYear();
    var mm = ('0' + (this.getMonth() + 1)).slice(-2);
    var dd  = ('0' + this.getDate()).slice(-2);
    return mm + '-' + dd + '-' + yyyy;
};

Date.prototype.mmsddsyyyy = Date.prototype.mmsddsyyyy || function() {
    var yyyy = this.getFullYear();
    var mm = ('0' + (this.getMonth() + 1)).slice(-2);
    var dd  = ('0' + this.getDate()).slice(-2);
    return mm + '/' + dd + yyyy + '/';
};

Date.prototype.ddmmyyyy = Date.prototype.ddmmyyyy || function() {
    var yyyy = this.getFullYear();
    var mm = ('0' + (this.getMonth() + 1)).slice(-2);
    var dd  = ('0' + this.getDate()).slice(-2);
    return dd + mm + yyyy;
};

Date.prototype.dd_mm_yyyy = Date.prototype.dd_mm_yyyy || function() {
    var yyyy = this.getFullYear();
    var mm = ('0' + (this.getMonth() + 1)).slice(-2);
    var dd  = ('0' + this.getDate()).slice(-2);
    return dd + '-' + mm + '-' + yyyy;
};

Date.prototype.ddsmmsyyyy = Date.prototype.ddsmmsyyyy || function() {
    var yyyy = this.getFullYear();
    var mm = ('0' + (this.getMonth() + 1)).slice(-2);
    var dd  = ('0' + this.getDate()).slice(-2);
    return dd + '/' + mm + '/' + yyyy;
};

var noJetLagged = function(n) {
    var d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().slice(0, 10);
}

var nDaysAgo = function(n) {
    var d = new Date();
    return d.setDate(d.getDate() - n);
}


exports.jetLagged = noJetLagged;
exports.nDaysAgo = nDaysAgo;