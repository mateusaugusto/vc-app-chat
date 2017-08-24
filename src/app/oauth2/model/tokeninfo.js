"use strict";
/**
 * Created by gustavo on 07/05/17.
 */
var TokenInfo = (function () {
    function TokenInfo() {
        this.createdTime = new Date().getTime();
    }
    TokenInfo.prototype.isExpired = function () {
        var dataAtual = new Date();
        var dataExpiracao = new Date(this.createdTime + (this.expires_in * 1000));
        if (dataAtual > dataExpiracao) {
            return true;
        }
        else {
            return false;
        }
    };
    return TokenInfo;
}());
exports.TokenInfo = TokenInfo;
//# sourceMappingURL=tokeninfo.js.map