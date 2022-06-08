module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  // TODO: 로그인 여부를 판단하고, Access token payload를 이용하여 응답을 제공하세요.
  if(!accessTokenData) {
    res.status(401).send({ data: null, message: 'not authorized' });
  } else {
    res.cookie('jwt', req.cookie)
    res.status(200).json({
      'data': {
        'userInfo':accessTokenData
      }
    })
  }
  
};
