const ApiError = require('../utils/apiError');

const checkRoleSDM = (req, res, next) => {
    if (req.user.role !== 'SDM') {
        return next(new ApiError('Akses ditolak. Anda tidak memiliki izin untuk mengakses halaman ini.', 403));
    }
    next();
};

const checkRoleSekretaris = (req, res, next) => {
    if (req.user.role !== 'Sekretaris') {
        return next(new ApiError('Akses ditolak. Anda tidak memiliki izin untuk mengakses halaman ini.', 403));
    }
    next();
};

module.exports = {
    checkRoleSDM,
    checkRoleSekretaris
};
