import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      app: {
        title: 'Swift Dynamics Test'
      },
      menu: {
        shapes: 'Layout & Style',
        persons: 'Person Management'
      },
      shapes: {
        title: 'Layout & Style',
        moveLeft: 'Move Left',
        moveRight: 'Move Right',
        togglePosition: 'Move Position',
        shapes: {
          circle: 'Circle',
          square: 'Square', 
          triangle: 'Triangle',
          diamond: 'Diamond',
          pentagon: 'Pentagon'
        }
      },
      persons: {
        title: 'Person Management System',
        addPerson: 'Add Person',
        editPerson: 'Edit Person',
        deletePerson: 'Delete Person',
        confirmDelete: 'Are you sure you want to delete this person?',
        form: {
          name: 'Name',
          age: 'Age',
          email: 'Email',
          phone: 'Phone',
          address: 'Address',
          nationality: 'Nationality',
          citizenId: 'Citizen ID',
          gender: 'Gender',
          mobilePhone: 'Mobile Phone',
          nameRequired: 'Please input the name!',
          ageRequired: 'Please input the age!',
          emailRequired: 'Please input the email!',
          emailInvalid: 'Please input a valid email!',
          phoneRequired: 'Please input the phone number!',
          addressRequired: 'Please input the address!',
          citizenIdRequired: 'Please input the citizen ID!',
          genderRequired: 'Please select the gender!',
          mobilePhoneRequired: 'Please input the mobile phone!'
        },
        table: {
          name: 'Name',
          age: 'Age',
          email: 'Email',
          phone: 'Phone',
          address: 'Address',
          nationality: 'Nationality',
          citizenId: 'Citizen ID',
          gender: 'Gender',
          mobilePhone: 'Mobile Phone',
          actions: 'Actions',
          edit: 'Edit',
          delete: 'Delete'
        },
        gender: {
          male: 'Male',
          female: 'Female',
          unisex: 'Unisex'
        },
        nationality: {
          thai: 'Thai',
          american: 'American',
          british: 'British',
          japanese: 'Japanese',
          chinese: 'Chinese',
          korean: 'Korean',
          indian: 'Indian',
          german: 'German',
          french: 'French'
        },
        messages: {
          addSuccess: 'Person added successfully!',
          editSuccess: 'Person updated successfully!',
          deleteSuccess: 'Person deleted successfully!'
        }
      },
      common: {
        cancel: 'Cancel',
        ok: 'OK',
        save: 'Save',
        edit: 'Edit',
        delete: 'Delete',
        confirm: 'Confirm',
        language: 'Language'
      }
    }
  },
  th: {
    translation: {
      app: {
        title: 'Swift Dynamics Test'
      },
      menu: {
        shapes: 'จัดการรูปทรง',
        persons: 'จัดการข้อมูลบุคคล'
      },
      shapes: {
        title: 'ระบบจัดการรูปทรง',
        moveLeft: 'เลื่อนซ้าย',
        moveRight: "เลื่อนขวา",
        togglePosition: 'สลับตำแหน่ง',
        shapes: {
          circle: 'วงกลม',
          square: 'สี่เหลี่ยม',
          triangle: 'สามเหลี่ยม',
          diamond: 'ข้าวหลามตัด',
          pentagon: 'ห้าเหลี่ยม'
        }
      },
      persons: {
        title: 'ระบบจัดการข้อมูลบุคคล',
        addPerson: 'เพิ่มบุคคล',
        editPerson: 'แก้ไขบุคคล',
        deletePerson: 'ลบบุคคล',
        confirmDelete: 'คุณแน่ใจหรือไม่ว่าต้องการลบบุคคลนี้?',
        form: {
          name: 'ชื่อ',
          age: 'อายุ',
          email: 'อีเมล',
          phone: 'เบอร์โทรศัพท์',
          address: 'ที่อยู่',
          nationality: 'สัญชาติ',
          citizenId: 'เลขบัตรประชาชน',
          gender: 'เพศ',
          mobilePhone: 'โทรศัพท์มือถือ',
          nameRequired: 'กรุณากรอกชื่อ!',
          ageRequired: 'กรุณากรอกอายุ!',
          emailRequired: 'กรุณากรอกอีเมล!',
          emailInvalid: 'กรุณากรอกอีเมลให้ถูกต้อง!',
          phoneRequired: 'กรุณากรอกเบอร์โทรศัพท์!',
          addressRequired: 'กรุณากรอกที่อยู่!',
          citizenIdRequired: 'กรุณากรอกเลขบัตรประชาชน!',
          genderRequired: 'กรุณาเลือกเพศ!',
          mobilePhoneRequired: 'กรุณากรอกโทรศัพท์มือถือ!'
        },
        table: {
          name: 'ชื่อ',
          age: 'อายุ',
          email: 'อีเมล',
          phone: 'เบอร์โทรศัพท์',
          address: 'ที่อยู่',
          nationality: 'สัญชาติ',
          citizenId: 'เลขบัตรประชาชน',
          gender: 'เพศ',
          mobilePhone: 'โทรศัพท์มือถือ',
          actions: 'การจัดการ',
          edit: 'แก้ไข',
          delete: 'ลบ'
        },
        gender: {
          male: 'ชาย',
          female: 'หญิง',
          unisex: 'ไม่ระบุ'
        },
        nationality: {
          thai: 'ไทย',
          american: 'อเมริกัน',
          british: 'อังกฤษ',
          japanese: 'ญี่ปุ่น',
          chinese: 'จีน',
          korean: 'เกาหลี',
          indian: 'อินเดีย',
          german: 'เยอรมัน',
          french: 'ฝรั่งเศส'
        },
        messages: {
          addSuccess: 'เพิ่มบุคคลสำเร็จ!',
          editSuccess: 'แก้ไขบุคคลสำเร็จ!',
          deleteSuccess: 'ลบบุคคลสำเร็จ!'
        }
      },
      common: {
        cancel: 'ยกเลิก',
        ok: 'ตกลง',
        save: 'บันทึก',
        edit: 'แก้ไข',
        delete: 'ลบ',
        confirm: 'ยืนยัน',
        language: 'ภาษา'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'th', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;