import _ from '@lodash';

const ContactModel = (data) =>
  _.defaults(data || {}, {
    logo: null,
    name: '',
    admins: [{ name: '', email: '' }],
    stores: [{ code: '', name: '', city: '', email: '' }],
  });

export default ContactModel;
