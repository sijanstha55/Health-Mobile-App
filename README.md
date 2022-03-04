# Installation:
This section contains information about to make the project ready for installation, environment needed for the process, and how to install the final product. The final installation of the application is done on the Android phones whose version need to be 5+. The final product from the product will be .apk file which is an android application file. The development can be done in Mac or Windows laptops. <br /> <br />
Followings are the things you need to have in your computer before you can run the project. <br />
- Java Development Kit (JDK)
- Node JS and NPM
- Expo-cli <br /><br />
If the above listed are not installed on your computer, please install them in following order: (Note: You may be asked to install if something is missing by your computer during this process, and in that case, please do so. You may have to reinstall the process if there was disruption because of missing part)  <br /><br />
Install JDK from https://www.oracle.com/java/technologies/javase-jdk15-downloads.html  <br /><br />
Install node JS and NPM from https://www.npmjs.com/get-npm  <br /><br />
Then you need to install expo-cli globally using the following command:
npm install --global expo-cli  <br /><br />
After the installation is complete, go to your project folder in the terminal and type the following command to install expo:  <br /><br />
npm add expo  <br /><br />
Then to get the .apk file to install on your phone, please type the following common while you are in root folder of your project: 
expo build:android <br /><br />
   
Following are the question and answer that need to be selected while the build is on process: <br /><br />
Would you like to proceed? > Y (yes) <br />
Chose the build type you would like:> apk <br />
Would you like to upload a keystore or have us generate one for you? > Generate new keystore <br /><br />
This will develop an android application (.apk) that you can install in android phones by downloading from the given URL.
User can install the app by opening the .apk file.
To uninstall the app, the user will need click the app for long time which will show the option of uninstall by clicking which the user can uninstall the app.
The app is hosted in expo account of the user that was used during build process. <br /><br />
See More at: [Health Mobile App User's Manual.pdf](https://github.com/sijanstha55/Health-Mobile-App/files/8187093/Health.Mobile.App.User.s.Manual.pdf)
