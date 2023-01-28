import axios from 'axios';

export const getAddressByCode = async (code) => {
  try {
    const res = await axios.get(
      `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${code}&is_ignore_zero=true`
    );
    console.log(`code는 ${code} 결과는 ${res.data.regcodes}`);
    return res?.data?.regcodes[0]?.name;
  } catch (err) {
    console.log(err);
    return '';
  }
};

export const getAddressListByCode = async (code) => {
  try {
    const res = await axios.get(
      `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${code}*&is_ignore_zero=true`
    );
    console.log(`code는 ${code} 결과는 ${res.data.regcodes}`);
    return res?.data?.regcodes;
  } catch (err) {
    console.log(err);
    return '';
  }
};
