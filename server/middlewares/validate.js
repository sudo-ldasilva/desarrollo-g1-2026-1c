export const validate = (schema, part) => (req, res, next) => {
    const result = schema.safeParse(req[part]);

    if (!result.success) {
        return next(result.error);
    }

    req.validated = req.validated || {};
    req.validated[part] = result.data;

    next();
};