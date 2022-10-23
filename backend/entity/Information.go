package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// เข้ารหัส
func SetupPasswordHash(pwd string) string {
	var password, _ = bcrypt.GenerateFromPassword([]byte(pwd), 14)
	return string(password)
}

func SetupIntoDatabase(db *gorm.DB) {
	//ระบบจัดการข้อมูล
	// Password1, err := bcrypt.GenerateFromPassword([]byte("Janjan@09"), 14)
	// Password2, err := bcrypt.GenerateFromPassword([]byte("Inkjizoo$25"), 14)

	//ตำแหน่ง
	Adminrole := UserRole{
		RoleName: "Admin",
	}
	db.Model(&UserRole{}).Create(&Adminrole)

	Doctorrole := UserRole{
		RoleName: "Doctor",
	}
	db.Model(&UserRole{}).Create(&Doctorrole)

	//login
	loginAdmin1 := Signin{
		Username: "PasopNiran445",
		Password: SetupPasswordHash("Janjan@09"),
		UserRole: Adminrole,
	}
	db.Model(&Signin{}).Create(&loginAdmin1)

	loginAdmin2 := Signin{
		Username: "Operamashell65",
		Password: SetupPasswordHash("Inkjizoo$25"),
		UserRole: Adminrole,
	}
	db.Model(&Signin{}).Create(&loginAdmin2)

	//Doctor login
	loginDoctor1 := Signin{
		Username: "Phonsak@gmail.com",
		Password: SetupPasswordHash("Phonsak01"),
		UserRole: Doctorrole,
	}
	db.Model(&Signin{}).Create(&loginDoctor1)
	loginDoctor2 := Signin{
		Username: "Hanoi@hotmail.in.th",
		Password: SetupPasswordHash("Hanoiploy"),
		UserRole: Doctorrole,
	}
	db.Model(&Signin{}).Create(&loginDoctor2)

	loginDoctor3 := Signin{
		Username: "Kanok@hotmail.com",
		Password: SetupPasswordHash("Pookpik05"),
		UserRole: Doctorrole,
	}
	db.Model(&Signin{}).Create(&loginDoctor3)

	// Set Data Admin
	db.Model(&Admin{}).Create(&Admin{
		// Ausername: "PasopNiran445",
		// Apassword: SetupPasswordHash("Janjan@09"),
		Aname:  "Pasop Panha",
		Tel:    "0933486361",
		Email:  "Pasop@hotmail.com",
		Signin: loginAdmin1,
	})
	db.Model(&Admin{}).Create(&Admin{
		// Ausername: "Operamashell65",
		// Apassword: SetupPasswordHash("Inkjizoo$25"),
		Aname:  "Saroj Winai",
		Tel:    "0933486362",
		Email:  "Saroj2@hmail.com",
		Signin: loginAdmin2,
	})

	// Set Data WorkPlace
	db.Model(&WorkPlace{}).Create(&WorkPlace{
		Pname:    "Outpatient",
		Paddress: "Suranaree 1 floor",
	})
	db.Model(&WorkPlace{}).Create(&WorkPlace{
		Pname:    "Inpatient",
		Paddress: "Suranaree 2, 3 floors",
	})
	db.Model(&WorkPlace{}).Create(&WorkPlace{
		Pname:    "Emergency",
		Paddress: "Suranaree 1 floor",
	})
	db.Model(&WorkPlace{}).Create(&WorkPlace{
		Pname:    "Surgery",
		Paddress: "Suranaree 4 floor",
	})

	// Set Data MedicalField
	db.Model(&MedicalField{}).Create(&MedicalField{
		Bname: "Forensic Medicine",
	})
	db.Model(&MedicalField{}).Create(&MedicalField{
		Bname: "Pediatrics",
	})
	db.Model(&MedicalField{}).Create(&MedicalField{
		Bname: "Surgery",
	})
	db.Model(&MedicalField{}).Create(&MedicalField{
		Bname: "Radiology",
	})

	var PasopNiran445 Admin
	var Operamashell65 Admin
	db.Raw("SELECT * FROM admins WHERE email = ?", "Pasop@hotmail.com").Scan(&PasopNiran445)
	db.Raw("SELECT * FROM admins WHERE email = ?", "Saroj2@hmail.com").Scan(&Operamashell65)

	var Outpatient WorkPlace
	var Inpatient WorkPlace
	var Emergency WorkPlace
	var Surgery WorkPlace
	db.Raw("SELECT * FROM work_places WHERE pname = ?", "Outpatient").Scan(&Outpatient)
	db.Raw("SELECT * FROM work_places WHERE pname = ?", "Inpatient").Scan(&Inpatient)
	db.Raw("SELECT * FROM work_places WHERE pname = ?", "Emergency").Scan(&Emergency)
	db.Raw("SELECT * FROM work_places WHERE pname = ?", "Surgery").Scan(&Surgery)

	var For MedicalField
	var Ped MedicalField
	var Sur MedicalField
	var Rad MedicalField
	db.Raw("SELECT * FROM medical_fields WHERE bname = ?", "ForensicMedicine").Scan(&For)
	db.Raw("SELECT * FROM medical_fields WHERE bname = ?", "Pediatrics").Scan(&Ped)
	db.Raw("SELECT * FROM medical_fields WHERE bname = ?", "Surgery").Scan(&Sur)
	db.Raw("SELECT * FROM medical_fields WHERE bname = ?", "Radiology").Scan(&Rad)

	timedate1 := time.Date(1987, 2, 16, 0, 0, 0, 0, time.Local)
	timeyear1 := time.Date(1999, 3, 22, 0, 0, 0, 0, time.Local)
	timedate2 := time.Date(1989, 9, 9, 0, 0, 0, 0, time.Local)
	timeyear2 := time.Date(2001, 1, 8, 0, 0, 0, 0, time.Local)
	timedate3 := time.Date(1985, 5, 13, 0, 0, 0, 0, time.Local)
	timeyear3 := time.Date(1997, 4, 24, 0, 0, 0, 0, time.Local)

	db.Model(&Doctor{}).Create(&Doctor{
		PersonalID: 1430099536148,
		Name:       "Phonsak songsang",
		Position:   "H. Surgery",
		Email:        "Phonsak@gmail.com",
		Password:     SetupPasswordHash("Phonsak01"),
		Salary:       35500,
		Tel:          "0653215252",
		Gender:       "Male",
		DateOfBirth:  timedate1,
		YearOfStart:  timeyear1,
		Address:      "219 m.10, nongprajak s, nongsham d, Ayutthaya 13000",
		Admin:        PasopNiran445,
		WorkPlace:    Surgery,
		MedicalField: Sur,
		Signin:       loginAdmin1,
	})

	db.Model(&Doctor{}).Create(&Doctor{
		PersonalID:   1425625963257,
		Name:         "Hanoi slotmachine",
		Position:     "h. Surgery",
		Email:        "Hanoi@hotmail.in.th",
		Password:     SetupPasswordHash("Hanoiploy"),
		Salary:       29500,
		Tel:          "0562354210",
		Gender:       "Female",
		DateOfBirth:  timedate2,
		YearOfStart:  timeyear2,
		Address:      "157 m.1, seesad s, dokpeeb d, Nakhonratchasima 30000",
		Admin:        Operamashell65,
		WorkPlace:    Surgery,
		MedicalField: Sur,
		Signin:       loginAdmin1,
	})

	db.Model(&Doctor{}).Create(&Doctor{
		PersonalID:   1895632542256,
		Name:         "Kanokthip Lamai",
		Position:     "Surgery",
		Email:        "Kanok@hotmail.com",
		Password:     SetupPasswordHash("Pookpik05"),
		Salary:       24000,
		Tel:          "0819656265",
		Gender:       "Male",
		DateOfBirth:  timedate3,
		YearOfStart:  timeyear3,
		Address:      "426 m.6, yabyol s, nangrong d, Buriram 31000",
		Admin:        PasopNiran445,
		WorkPlace:    Surgery,
		MedicalField: Sur,
		Signin:       loginAdmin2,
	})

	var Phonsak Doctor
	var Hanoi Doctor
	var Kanokthip Doctor
	db.Raw("SELECT * FROM doctors WHERE name = ?", "Phonsak songsang").Scan(&Phonsak)
	db.Raw("SELECT * FROM doctors WHERE name = ?", "Hanoi slotmachine").Scan(&Hanoi)
	db.Raw("SELECT * FROM doctors WHERE name = ?", "Kanokthip Lamai").Scan(&Kanokthip)

	//ระบบยืมเครื่องมือ
	db.Model(&TypeofUse{}).Create(&TypeofUse{
		Name: "licensed",
	})
	db.Model(&TypeofUse{}).Create(&TypeofUse{
		Name: "inform details",
	})
	db.Model(&TypeofUse{}).Create(&TypeofUse{
		Name: "general",
	})

	var licensed TypeofUse
	var informdetails TypeofUse
	var general TypeofUse
	db.Raw("SELECT * FROM Typeof_uses WHERE name = ?", "licensed").Scan(&licensed)
	db.Raw("SELECT * FROM Typeof_uses WHERE name = ?", "inform details").Scan(&informdetails)
	db.Raw("SELECT * FROM Typeof_uses WHERE name = ?", "general").Scan(&general)

	humanbloodbag := MedicalEquipment{
		Name:      "human blood bag",
		TypeofUse: licensed,
		// TypeOfUse: licensed,
	}
	db.Model(&MedicalEquipment{}).Create(&humanbloodbag)

	drugtestingkit := MedicalEquipment{
		Name:      "drug testing kit",
		TypeofUse: informdetails,
		// TypeOfUse: informdetails,
	}
	db.Model(&MedicalEquipment{}).Create(&drugtestingkit)

	surgicalequipment := MedicalEquipment{
		Name:      "surgical equipment",
		TypeofUse: general,
		// TypeOfUse: general,
	}
	db.Model(&MedicalEquipment{}).Create(&surgicalequipment)
	//-----------------------------------------------------------------------
	Out := Worklocation{
		Name:    "Outpatient",
		Address: "Suranaree 1 floor",
	}
	db.Model(&Worklocation{}).Create(&Out)

	In := Worklocation{
		Name:    "Inpatient",
		Address: "Suranaree 2,3 floor",
	}
	db.Model(&Worklocation{}).Create(&In)

	Em := Worklocation{
		Name:    "Emergency",
		Address: "Suranaree 1 floor",
	}
	db.Model(&Worklocation{}).Create(&Em)

	// // Su := Worklocation{
	// // 	Name:    "Surgery",
	// // 	Address: "Suranaree 4 floor",
	// // }
	// db.Model(&Worklocation{}).Create(&Surgery)
	//-------------------------------------------------------------------------
	Borrow1 := time.Date(2021, 05, 25, 45, 35, 0, 0, time.Now().Location())
	Borrow2 := time.Date(2021, 05, 25, 45, 35, 0, 0, time.Now().Location())
	Borrow3 := time.Date(2021, 05, 25, 45, 35, 0, 0, time.Now().Location())
	Return1 := time.Date(2021, 05, 25, 45, 35, 0, 0, time.Now().Location())
	Return2 := time.Date(2021, 05, 25, 45, 35, 0, 0, time.Now().Location())
	Return3 := time.Date(2021, 05, 25, 45, 35, 0, 0, time.Now().Location())

	db.Model(&Borrow{}).Create(&Borrow{
		BorrowDate:       Borrow1,
		ReturnDate:       Return1,
		Quant:            1,
		Doctor:           Phonsak, //แก้ดึงข้อมูลจากเติล
		MedicalEquipment: humanbloodbag,
		Worklocation:     Out,
	})

	db.Model(&Borrow{}).Create(&Borrow{
		BorrowDate:       Borrow2,
		ReturnDate:       Return2,
		Quant:            2,
		Doctor:           Hanoi, //แก้ดึงข้อมูลจากเติล
		MedicalEquipment: drugtestingkit,
		Worklocation:     In,
	})

	db.Model(&Borrow{}).Create(&Borrow{
		BorrowDate:       Borrow3,
		ReturnDate:       Return3,
		Quant:            3,
		Doctor:           Kanokthip, //แก้ดึงข้อมูลจากเติล
		MedicalEquipment: surgicalequipment,
		Worklocation:     Out,
	})

	//ระบบบันทึกข้อมูลล่วงเวลา
	//Activity Data
	morningduty := Activity{
		Name: "morning duty",
		Time: time.Date(2022, 9, 10, 0, 0, 0, 0, time.Now().Location()),
	}
	db.Model(&Activity{}).Create(&morningduty)

	nightduty := Activity{
		Name: "night duty",
		Time: time.Date(2022, 9, 13, 0, 0, 0, 0, time.Now().Location()),
	}
	db.Model(&Activity{}).Create(&nightduty)

	extraduty := Activity{
		Name: "extra duty",
		Time: time.Date(2022, 9, 15, 0, 0, 0, 0, time.Now().Location()),
	}
	db.Model(&Activity{}).Create(&extraduty)

	//Workplace Data
	OP := Locationwork{
		Name:    "Outpatient",
		Address: "Suranaree 1 floor",
	}
	db.Model(&Locationwork{}).Create(&OP)

	IP := Locationwork{
		Name:    "Inpatient",
		Address: "Suranaree 2,3 floor",
	}
	db.Model(&Locationwork{}).Create(&IP)

	ER := Locationwork{
		Name:    "Emergency",
		Address: "Suranaree 1 floor",
	}
	db.Model(&Locationwork{}).Create(&ER)

	SUR := Locationwork{
		Name:    "Surgery",
		Address: "Suranaree 4 floor",
	}
	db.Model(&Locationwork{}).Create(&SUR)

	//Overtime Data
	//overtime1
	db.Model(&Overtime{}).Create(&Overtime{
		Doctor:       Phonsak, //แก้ดึงข้อมูลจากเติล
		Activity:     morningduty,
		Locationwork: OP,
		Num:          7,
		Time:         time.Date(2022, 9, 11, 6, 0, 0, 0, time.Now().Location()),
	})
	//overtime2
	db.Model(&Overtime{}).Create(&Overtime{
		Doctor:       Hanoi, //แก้ดึงข้อมูลจากเติล
		Activity:     nightduty,
		Locationwork: IP,
		Num:          8,
		Time:         time.Date(2022, 9, 13, 8, 0, 0, 0, time.Now().Location()),
	})
	//overtime3
	db.Model(&Overtime{}).Create(&Overtime{
		Doctor:       Kanokthip, //แก้ดึงข้อมูลจากเติล
		Activity:     extraduty,
		Locationwork: ER,
		Num:          6,
		Time:         time.Date(2022, 9, 15, 5, 0, 0, 0, time.Now().Location()),
	})

	//ระบบผู้ป่วยในการดูแลของแพทย์
	// ตาราง type.....................................................
	type1 := PatientType{
		Type: "outpatient",
	}
	db.Model(&PatientType{}).Create(&type1)

	type2 := PatientType{
		Type: "inpatient",
	}
	db.Model(&PatientType{}).Create(&type2)
	//ตารางโรค.......................................................
	Sym1 := Symptoms{
		SymptomsName: "CRF",
	}
	db.Model(&Symptoms{}).Create(&Sym1)

	Sym2 := Symptoms{
		SymptomsName: "Hypertension",
	}
	db.Model(&Symptoms{}).Create(&Sym2)

	Sym3 := Symptoms{
		SymptomsName: "ICH",
	}
	db.Model(&Symptoms{}).Create(&Sym3)

	Sym4 := Symptoms{
		SymptomsName: "AF",
	}
	db.Model(&Symptoms{}).Create(&Sym4)

	//ตารางผู้ป่วย.......................................................
	db.Model(&Patient{}).Create(&Patient{
		PatientsName: "Arnon Derek",
		DateAdmit:    time.Date(2022, 1, 2, 9, 0, 0, 0, time.Now().Location()),
		Age:          32,
		Doctor:       Phonsak,
		Symptoms:     Sym3,
		PatientType:  type2,
	})

	db.Model(&Patient{}).Create(&Patient{
		PatientsName: "Darin Darwin",
		DateAdmit:    time.Date(2022, 3, 2, 10, 0, 0, 0, time.Now().Location()),
		Age:          51,
		Doctor:       Hanoi,
		Symptoms:     Sym1,
		PatientType:  type1,
	})

	db.Model(&Patient{}).Create(&Patient{
		PatientsName: "Thana Ngampon",
		DateAdmit:    time.Date(2022, 2, 3, 9, 0, 0, 0, time.Now().Location()),
		Age:          60,
		Doctor:       Phonsak,
		Symptoms:     Sym4,
		PatientType:  type2,
	})

	//ระบบตารางเวลาแพทย์
	//การเพิ่มข้อมูลตาราง WorkPalce
	loca1 := Location{
		Name: "Emergency and Accident Department",
		// Address: "Suranaree Building, 1st Floor",
	}
	db.Model(&Location{}).Create(&loca1)

	loca2 := Location{
		Name: "Outpatient Department",
		// Address: "Suranaree Building, 1st Floor",
	}
	db.Model(&Location{}).Create(&loca2)

	//การเพิ่มข้อมูลตาราง MedActivity
	Activity1 := MedActivity{
		Name: "Operating Room",
	}
	db.Model(&MedActivity{}).Create(&Activity1)

	Activity2 := MedActivity{
		Name: "External Patient Examination",
	}
	db.Model(&MedActivity{}).Create(&Activity2)
	//การเพิ่มข้อมูลตาราง Schedule
	timeSchedule1 := time.Date(2022, 8, 30, 06, 00, 00, 00, time.Local)
	timeSchedule2 := time.Date(2022, 8, 30, 10, 00, 00, 00, time.Local)

	db.Model(&Schedule{}).Create(&Schedule{
		Time:        timeSchedule1,
		Doctor:      Phonsak,
		Location:    loca1,
		MedActivity: Activity1,
	})

	db.Model(&Schedule{}).Create(&Schedule{
		Time:        timeSchedule2,
		Doctor:      Hanoi,
		Location:    loca2,
		MedActivity: Activity2,
	})

	//ระบบลาพักงานของแพทย์
	//--- ประเภทการลา ---//
	Personal := Type{
		Tleave: "Personal leave",
	}
	db.Model(&Type{}).Create(&Personal)

	Sick := Type{
		Tleave: "Sick leave",
	}
	db.Model(&Type{}).Create(&Sick)

	Maternity := Type{
		Tleave: "Maternity leave",
	}
	db.Model(&Type{}).Create(&Maternity)

	//--- ชนิดหลักฐาน ---//
	Document := Evidence{
		Etype: "Document",
	}
	db.Model(&Evidence{}).Create(&Document)

	Medicalcertificate := Evidence{
		Etype: "Medical certificate",
	}
	db.Model(&Evidence{}).Create(&Medicalcertificate)

	ImageVideo := Evidence{
		Etype: "Image/Video",
	}
	db.Model(&Evidence{}).Create(&ImageVideo)

	//leave data1
	db.Model(&Leave{}).Create(&Leave{
		Reason:   "to run errands in the provinces",
		Fdate:    time.Date(2022, 1, 1, 0, 0, 0, 0, time.Now().Location()),
		Ldate:    time.Date(2022, 1, 5, 0, 0, 0, 0, time.Now().Location()),
		Doctor:   Phonsak,
		Type:     Personal,
		Evidence: Document,
	})
	//leave data2
	db.Model(&Leave{}).Create(&Leave{
		Reason:   "COVID-infected",
		Fdate:    time.Date(2022, 2, 1, 0, 0, 0, 0, time.Now().Location()),
		Ldate:    time.Date(2022, 2, 16, 0, 0, 0, 0, time.Now().Location()),
		Doctor:   Hanoi,
		Type:     Sick,
		Evidence: Medicalcertificate,
	})

}
