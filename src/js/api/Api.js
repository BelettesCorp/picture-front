var AppConfig = require('AppConfig');
var HttpFactory = require('../utils/HttpFactory');
var Uri = require('../utils/Uri');
var Resource = require('../utils/Resource');

var Http = HttpFactory();

var OffersApi = {
    getOffers() {
        return Resource.get(new Uri('{0}/admin/api/offers', AppConfig.webHost).toString());
    },
    saveOffer(offer) {
        return Resource.post(new Uri('{0}/admin/api/offers', AppConfig.webHost).toString(), offer);
    },
    updateOffer(offer) {
        return Resource.put(new Uri('{0}/admin/api/offers/{1}', AppConfig.webHost, offer._id).toString(), offer);
    },
    deleteOffer(offerId) {
        return Resource.delete(new Uri('{0}/admin/api/offers/{1}', AppConfig.webHost, offerId).toString());
    }
};

var BundlesApi = {
    getBundles() {
        return Resource.get(new Uri('{0}/admin/api/bundles', AppConfig.webHost).toString());
    },
    saveBundle(bundle) {
        return Resource.post(new Uri('{0}/admin/api/bundles', AppConfig.webHost).toString(), bundle);
    },
    updateBundle(bundle) {
        return Resource.put(new Uri('{0}/admin/api/bundles', AppConfig.webHost).toString(), bundle);
    },
    deleteBundle(bundleId) {
        return Resource.delete(new Uri('{0}/admin/api/bundles/{1}', AppConfig.webHost, bundleId).toString());
    }
};

var ProductsApi = {
    getProducts() {
        return Resource.get(new Uri('{0}/admin/api/products', AppConfig.webHost).toString());
    }
};

var UsersApi = {
    getUserTypes() {
        return Resource.get(new Uri('{0}/admin/api/users/types', AppConfig.webHost).toString());
    },
    searchUsers(query) {
        return Resource.get(new Uri('{0}/admin/api/users/search/{1}', AppConfig.webHost, query).toString());
    }
};

var SubscriptionsApi = {
    getSubscriptionsWithFilters(startIndex, endIndex, offersId, ssoUserId) {
        let query = {
            from: startIndex,
            to: endIndex,
            offerIds: offersId,
            userId: ssoUserId
        };

        return Resource.get(new Uri('{0}/admin/api/subscriptions', AppConfig.webHost).query(query).toString());
    },
    updateSubscription(subscription) {
        return Resource.put(new Uri('{0}/admin/api/subscriptions', AppConfig.webHost).toString(), subscription);
    }
};

var VouchersApi = {
    getVoucher(voucherId) {
        return Resource.get(new Uri('{0}/admin/api/vouchers/{1}', AppConfig.webHost, voucherId).toString());
    },
    getVouchers() {
        return Resource.get(new Uri('{0}/admin/api/vouchers', AppConfig.webHost).toString());
    },
    getVouchersWithFilters(startIndex, endIndex, voucherName, userEmail, code, showExpired, voucherType, offer, statuses) {
        let query = {
            from: startIndex,
            to: endIndex,
            name: voucherName,
            email: userEmail,
            code: code,
            showExpired: showExpired,
            typ: voucherType ? voucherType : "",
            offerId: offer ? offer._id : "",
            statuses: statuses
        };

        return Resource.get(new Uri('{0}/admin/api/vouchers', AppConfig.webHost).query(query).toString());
    },
    saveVoucher(voucher) {
        return Resource.post(new Uri('{0}/admin/api/vouchers', AppConfig.webHost).toString(), voucher);
    },
    updateVoucher(voucher) {
        return Resource.put(new Uri('{0}/admin/api/vouchers', AppConfig.webHost).toString(), voucher);
    },
    cancelVoucher(voucherId) {
        return Resource.put(new Uri('{0}/admin/api/vouchers/{1}/cancel', AppConfig.webHost, voucherId).toString());
    },
    getVoucherTypes() {
        return Resource.get(new Uri('{0}/admin/api/vouchers/types', AppConfig.webHost).toString());
    },
    getVoucherStatuses() {
        return Resource.get(new Uri('{0}/admin/api/vouchers/statuses', AppConfig.webHost).toString());
    },
    generateCode() {
        return Resource.get(new Uri('{0}/admin/api/vouchers/code', AppConfig.webHost).toString());
    },
    codeExists(code) {
        return Resource.get(new Uri('{0}/admin/api/vouchers/code/{1}', AppConfig.webHost, code).toString());
    },
    exportVouchersToCsv(vouchers) {
        return Resource.post(new Uri('{0}/admin/api/vouchers/toCsv', AppConfig.webHost).toString(), vouchers);
    },
    sendVouchersByEmail(vouchers) {
        return Resource.post(new Uri('{0}/admin/api/vouchers/email', AppConfig.webHost).toString(), vouchers);
    }
};

var MandrillApi = {
    getMandrillTemplates() {
        return Resource.get(new Uri('{0}/admin/api/mandrillTemplates', AppConfig.webHost).toString());
    }
};

module.exports = {
    offersApi: OffersApi,
    bundlesApi: BundlesApi,
    productsApi: ProductsApi,
    usersApi: UsersApi,
    subscriptionsApi: SubscriptionsApi,
    vouchersApi: VouchersApi,
    mandrillApi: MandrillApi
};
