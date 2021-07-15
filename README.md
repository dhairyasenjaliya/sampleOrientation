# sampleOrientation to setup and run project  
# To install dependency 
- npm install (Root folder)
- cd ios && pod install (In iOS folder)
# To run in android 
- react-native run-android (Root Folder)
# To run in iOS 
- react-native run-ios (Root Folder)


# To setup orientation on button click please apply following instruction carefully 
# Install dependency
    => npm i react-native-orientation-locker  
# Configuration for iOS

    => cd ios && pod install (In iOS folder)

    => Go to directory (ios/sampleOrientation/AppDelegate.m) and add below code 

        #import "Orientation.h"

        @implementation AppDelegate 
        - (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
            return [Orientation getOrientation];
        }
# Configuration for Android

=> Add below code to android/app/src/main/AndroidManifest.xml
    
    <activity 
+        android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
    > 
    </activity>

=> Add below code to android/app/src/main/java/com/sampleorientation(your app name)/MainActivity.java

+import android.content.Intent;
+import android.content.res.Configuration;

public class MainActivity extends ReactActivity {

+   @Override
+   public void onConfigurationChanged(Configuration newConfig) {
+       super.onConfigurationChanged(newConfig);
+       Intent intent = new Intent("onConfigurationChanged");
+       intent.putExtra("newConfig", newConfig);
+       this.sendBroadcast(intent);
+   }

}      


=> Add below code to android/app/src/main/java/com/sampleorientation(your app name)/MainApplication.java

+ import org.wonday.orientation.OrientationActivityLifecycle;
  @Override
  public void onCreate() {
+    registerActivityLifecycleCallbacks(OrientationActivityLifecycle.getInstance());
  }
      