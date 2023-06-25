![image](https://user-images.githubusercontent.com/52489083/149637586-f0c3b5ce-6b99-431f-b821-7ca1e208073e.png)

<!-- this is a comment
![NPM Downloads](https://img.shields.io/npm/dy/theme-csx?logo=GIthub&style=for-the-badge) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/KJA-Tsx/theme-csx?logo=GIthub&style=for-the-badge) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/KJA-Tsx/theme-csx?logo=GIthub&style=for-the-badge) ![GitHub](https://img.shields.io/github/license/KJA-Tsx/theme-csx?logo=GIthub&style=for-the-badge)


**`IOS`**: theme chanes will show immediately!

**`Android`**: theme chanes will show after app reopened!
 -->

![NPM Downloads](https://img.shields.io/npm/dy/theme-csx?logo=GIthub&style=for-the-badge) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/KJA-Tsx/theme-csx?logo=GIthub&style=for-the-badge) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/KJA-Tsx/theme-csx?logo=GIthub&style=for-the-badge) ![GitHub](https://img.shields.io/github/license/KJA-Tsx/theme-csx?logo=GIthub&style=for-the-badge)

:last_quarter_moon: **Youtube Tutorial**: https://youtu.be/wW20AkwmGMk
#

<table align="center">
   <thead>
      <tr>
         <th>IOS</th>
         <th>Android</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td><img src="https://github.com/KJ-GM/theme-csx/blob/master/RPReplay-Final1644961619.gif" alt="Showcase iOS" width="234" height="433"> </td>
                  <td><img src="https://user-images.githubusercontent.com/52489083/155139274-36543351-0585-46fd-ab81-1c254bf3020b.gif" alt="Showcase Android" width="234" height="439"></td>
      </tr>
   </tbody>
</table>

# 🚀 Features

- Similar to standard react native styling, but with additional props that can be added to make it themeable.
- Can be implemented for Views + Texts + Images + Icons...
- Light & Fast.
- Expo & React Native.
- Supports React Navigation.

🌟 **System**: changes to the phone _`appearance`_ preference while the app is running will be applied dynamically. 
- **IOS:** changes will be shown _`immediately`_ without the need to reopen the app.

## ✅ Installation

```sh
npm install theme-csx
```

```sh
yarn add theme-csx
```

## 📝 Get Started

> **StyleSheet**

- Is similar to the usual styling format, but now you have additional props to make style themeable.

> **T() - Themed Function**

- Apply **only** your themed styles using the T() function wrapper.

> **TV() - Themed Value Function**

- Is an extra helper function that can be used to theme a specific value. (it becomes useful with react navigation)

> **appearanceHook**

- Use the appearanceHook to switch theme from anywhere in your app.

**🌓 Expo**: To make the system preference work, make sure `"userInterfaceStyle":"automatic"` is added to app.json

## Usage ❓

```js
// Styles
import { StyleSheet, T, appearanceHook } from 'theme-csx';

// Components
import { Text, View } from 'react-native';
import { Button } from '@components/atoms';

const DemoComponent = () => {
  // Theme switch
  const switchTheme = () => {
    appearanceHook.switch(
      appearanceHook.activeTheme === 'dark' ? 'light' : 'dark'
    );
  };

  return (
    <View style={T(styles.THEMED_CONTAINER)}>
      <Text style={styles.NORMAL_TEXT}>Hey, I am normal text</Text>

      <Text style={T(styles.THEMED_TEXT)}>Hey, I am themed text</Text>

      <Button text={'Switch theme'} onPress={switchTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  THEMED_CONTAINER: {
    flex: 1,
    backgroundColor: 'white',
    backgroundDark: 'gray', // backgroundDark prop was added to make it themeable
    alignItems: 'center',
    justifyContent: 'center',
  },
  NORMAL_TEXT: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'green',
  },
  THEMED_TEXT: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
    colorDark: 'white', // colorDark prop was added to make it themeable
  },
});
```

## 🚦Theme Types:

> TViewStyle:

- Has the following extra props: `backgroundDark`, `borderDark`

> TTextStyle:

- Has the following extra props: `colorDark`, `backgroundDark`, `borderDark`

> TImageStyle:

- Has the following extra props: `tintColorDark`, `backgroundDark`, `borderDark`

> appearanceHook.switch():

- Has the following options: `system`, `light`, `dark`

## License

Apache-2.0 License


## C# -  Windows Form 

```js

Design: 

// Lables:
firstNameLabel
lastNameLabel
mobileNumberLabel
passwordLabel
usernameLabel

// Texboxes 
firstNameTextBox
lastNameTextBox
mobileNumberTextBox
usernameTextBox
passwordTextBox

// ProgressBar
progressBar

// CheckBoox
studentCodeCheckBox

// Button
registration

// Interface:

// Lables

First Name
Last Name
Mobile Number
Username
Password

Are you agree to the StudentCode?
Do you want monthly payment graphic?
Are you in social program?
Are you from Ukraine?

 // Logo bring from the web
 
-------------------------------------------------------------------------------
 
using static System.Windows.Forms.VisualStyles.VisualStyleElement.StartPanel;

namespace Question6
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void registration_Click(object sender, EventArgs e)
        {
            // Retrieve user input values
            string firstName = firstNameTextBox.Text;
            string lastName = lastNameTextBox.Text;
            string mobileNumber = mobileNumberTextBox.Text;
            string username = usernameTextBox.Text;
            string password = passwordTextBox.Text;
            bool studentCodeChecked = studentCodeCheckBox.Checked;

            // Validations:

            // 1) Null + Symbol + Length Check
            bool isValid = NSLCheck(firstName, lastName, mobileNumber, password, username, studentCodeChecked);

            // Final Check
            if (!isValid)
            {
                // Show Error Message 
                MessageBox.Show("Insufficient information. Please fill in all fields properly and check mandatory checkboxes.", "Error");
            }
            else
            {
                // Move to next page
                MessageBox.Show("Welcome to UG!", "Successful Registration");
            }
        }

        // Helper functions

        private bool NSLCheck(string firstName, string lastName, string mobileNumber, string password, string username, bool studentCodeChecked)
        {
            bool isValid = true;

            if (int.TryParse(firstName, out int result1) || string.IsNullOrEmpty(firstName))
            {
                firstNameLabel.ForeColor = Color.Red;
                isValid = false;
            }
            else
            {
                firstNameLabel.ForeColor = Color.Black;
            }

            if (int.TryParse(lastName, out int result2) || string.IsNullOrEmpty(lastName))
            {
                lastNameLabel.ForeColor = Color.Red;
                isValid = false;
            }
            else
            {
                lastNameLabel.ForeColor = Color.Black;
            }

            if (!int.TryParse(mobileNumber, out int result3) || mobileNumber.Length < 9 || string.IsNullOrEmpty(mobileNumber))
            {
                mobileNumberLabel.ForeColor = Color.Red;
                isValid = false;
            }
            else
            {
                mobileNumberLabel.ForeColor = Color.Black;
            }

            if (password.Length < 8 || string.IsNullOrEmpty(password))
            {
                passwordLabel.ForeColor = Color.Red;
                isValid = false;
            }
            else
            {
                passwordLabel.ForeColor = Color.Black;
            }

            if (string.IsNullOrEmpty(username))
            {
                usernameLabel.ForeColor = Color.Red;
                isValid = false;
            }
            else
            {
                usernameLabel.ForeColor = Color.Black;
            }

            if (!studentCodeChecked)
            {
                studentCodeCheckBox.ForeColor = Color.Red;
                isValid = false;
            }
            else
            {
                studentCodeCheckBox.ForeColor = Color.Black;
            }
            return isValid;
        }



        private void passwordTextBox_TextChanged_1(object sender, EventArgs e)
        {
            // Update the progress bar based on the length of the text in the TextBox
            int characterCount = passwordTextBox.Text.Length;

            if (characterCount > 8)
            {
                progressBar.Value = 100; // Set the progress bar to maximum value (100%)
            }
            else
            {
                progressBar.Value = characterCount * 100 / 8; // Calculate the progress percentage
            }
        }
    }
}
```

## Questions -  1-5

```js

Class Car:

using System;
namespace Q1
{
	public class Car
	{
		public Car(int year, int mileage, int weight)
		{
            Year = year;
            Mileage = mileage;
            Weight = weight;
        }

        // Get and Set methods for the object Car:

        private int year;
        public int Year
        {
            get { return year; }
            set { year = value; }
        }

        private int mileage;
        public int Mileage
        {
            get { return mileage; }
            set { mileage = value; }
        }

        private int weight;
        public int Weight
        {
            get { return weight; }
            set { weight = value; }
        }

    }
}
---------------------------------------------------

Class Poruche:
 
using System;
namespace Q3
{
	public class Porsche:Car
	{
		public Porsche(int year, int mileage, int weight, string model, int maxSpeed):base(year, mileage, weight)
		{
            Model = model;
            MaxSpeed = maxSpeed;
        }

        private string model;
        public string Model
        {
            get { return model; }
            set { model = value; }
        }

        private int maxSpeed;
        public int MaxSpeed
        {
            get { return maxSpeed; }
            set { maxSpeed = value; }
        }
    }
}

---------------------------------------------------

Class OnlineShop:

using System;
namespace Q3
{
	public class OnlineShop
	{
        private string productName;
        private decimal productPrice;
        private int productQuantity;

        public OnlineShop(string name, decimal price, int quantity)
        {
            productName = name;
            productPrice = price;
            productQuantity = quantity;
        }

        public decimal CalculateTotalPrice(int quantity)
        {
            return productPrice * quantity;
        }

        public void PrintProductInfo()
        {
            Console.WriteLine("Product Name: " + productName);
            Console.WriteLine("Product Price: " + productPrice + "$");
            Console.WriteLine($"Product Quantity: "+ productQuantity);
            Console.WriteLine("Total Value: " + CalculateTotalPrice(productQuantity) + "$");

        }

    }
}
---------------------------------------------------

Interface Students:

using System;
namespace Q4
{
	public interface Students
	{
         double CalculateMarks(double writingScore, double verbalScore);
    }
}

---------------------------------------------------

Abstract class Calculation:

using System;
namespace Q5
{
	public abstract class Calculation
	{
		public abstract int CalculateTotalValue();
        public abstract int CalculateTotalPrice();
    }
}
---------------------------------------------------
 
Main Core class:

using System;
namespace Quiz1_KaramElgamal_201829_
{
    class Hello
    {
        static void Main(string[] args)
        {
            // Q1
            Students Nick = new Students();
            Nick.FirstName = "Karam";
            Nick.LastName = "Elgamal";
            Nick.UgCode = 201829;
            Nick.MonthlyFee = 400;

            Console.WriteLine("First name: " + Nick.FirstName);
            Console.WriteLine("Last name: " + Nick.LastName);
            Console.WriteLine("UG code: " + Nick.UgCode);
            Console.WriteLine("Monthly fee: " + Nick.MonthlyFee + "$");

            // Space
            Console.WriteLine("-------------------------------");

            // Q2

            Porsche porsche = new Porsche(2012, 22000, 2300, "Macan", 320);

            Console.WriteLine("Year: " + porsche.Year);
            Console.WriteLine("Mileage: " + porsche.Mileage + " km");
            Console.WriteLine("Weight: " + porsche.Weight + " kg");
            Console.WriteLine("Model: " + porsche.Model);
            Console.WriteLine("Max Speed: " + porsche.MaxSpeed + "mph");

            // Space
            Console.WriteLine("-------------------------------");

            // Q3
            OnlineShop phone = new OnlineShop("iPhone 4s", 1500, 5);
            phone.PrintProductInfo();

        }

    }
}

```

## Network

```js
Swtich(1):

en
conf t

// HostName
hostname S1

// Vlan Names

vlan 15
name Sales
exit
vlan 25
name Research
exit
vlan 35
name Servers
exit
vlan 88
name Mgt
exit
vlan 98
name Native
exit

// Allowed vlans, and native vlan
int range g0/1-2
switchport mode trunk
switchport trunk native vlan 98
switchport trunk allowed vlan 15,25,35,88,98
exit

// Access switchports with vlans
int <f0/5>; - Different by Switch
switchport mode access
switchport access vlan <15> - Different by Switch: (Pc1-15, Pc2-25, PcAdmin- 88, Servers-35)
exit

// Shutdown unused switchports
int range <f0/1-4, f0/6-24> - Different by Switch
shutdown
exit

// The management interface vlan 88 with an ip address
int v88
ip address <192.168.88.11 255.255.255.0> - Different by Switch: (Find IP in table Switches)
exit

// Use the planned R1 address 192.168.88.1 as the default gateway
ip default-gateway 192.168.88.1

exit 
write

----------------------------------
	
Router(1/3):

en
conf t

// HostName
hostname R1

// Configure interfaces:

// R1 -> S1 interface - Diff(R3)
int g0/0 - Diff(R3)
no shutdown
exit

// R1 -> S1 vlans interfaces - Diff(R3)

int g0/0.15
encapsulation dot1Q 15
ip address 192.168.15.1 255.255.255.0 - Diff(R3)
exit

int g0/0.25 
encapsulation dot1Q 25
ip address 192.168.25.1 255.255.255.0 - Diff(R3)
exit

int g0/0.35 
encapsulation dot1Q 35
ip address 192.168.35.1 255.255.255.0 - Diff(R3)
exit

int g0/0.88 
encapsulation dot1Q 88
ip address 192.168.88.1 255.255.255.0 - Diff(R3)
exit

int g0/0.98 
encapsulation dot1Q 98 native
ip address 192.168.98.1 255.255.255.0 - Diff(R3)
exit

// R1 -> R2 vlans interfaces - Diff(R3)

int s0/0/0
ip address 192.168.5.1 255.255.255.252 - Diff(R3)
no shutdown
clock rate 2000000 - Only For specified interfaces
exit;

// Configure RIP dynamic routing - Diff(3)
router rip
version 2
network 192.168.15.0
network 192.168.25.0
network 192.168.35.0
network 192.168.88.0
network 192.168.98.0
network 192.168.5.0 - Diff(3)
exit


// Configure DHCP pool - Only R1

ip dhcp pool POOL15
network 192.168.15.0 255.255.255.0
default-router  192.168.15.1
dns-server 192.168.35.253
exit

ip dhcp pool POOL25
network 192.168.25.0 255.255.255.0
default-router  192.168.25.1
dns-server 192.168.35.253


exit 
write

----------------------------------

Router(2):

en
conf t

// HostName
hostname R2

// Configure interfaces:

int s0/0/0
ip address 192.168.5.2 255.255.255.252 
no shutdown
exit;

int s0/0/1
ip address 192.168.5.5 255.255.255.252 
no shutdown
clock rate 128000 - Only For specified interfaces
exit;

int s0/1/0
ip address 209.165.201.66 255.255.255.0 
no shutdown
exit;

// Configure RIP dynamic routing

router rip
version 2
network 192.168.5.0
network 192.168.5.4
default-information originate 
ip route 0.0.0.0.0.0.0.0 s0/1/0
exit 

exit 
write
```

