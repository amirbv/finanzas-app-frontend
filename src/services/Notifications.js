import PushNotification from "react-native-push-notification";

class Notifications {
  constructor() {
    PushNotification.configure({
      onRegister: function (token) {
        
      },
      onNotification: function (notification) {
        console.log("notification:", notification);
      },
      popInitialNotification: true,
      requestPermissions: false
    });

    PushNotification.createChannel(
      {
        channelId: 'reminders',
        channelName: 'Task reminder notifications',
        channelDescription: 'Reminder for any tasks'
      },
      () => { }
    );
    PushNotification.getScheduledLocalNotifications(rn => {
      console.log("Notification center: ", rn);
    })
  }

  scheduleNotification(date, budgetId, title = "", message = "") {
    PushNotification.localNotificationSchedule({
      channelId: 'reminders',
      id: budgetId,
      title,
      message,
      date
    });
  }

  getScheduledLocalNotifications() {
    PushNotification.getScheduledLocalNotifications(rn => {
      console.log("Notification center: ", rn);
    });
  }

  clearAllLocalNotifications() {
    PushNotification.cancelAllLocalNotifications();
  }

  clearSingleNotification(notificationId) {
    PushNotification.cancelLocalNotification(notificationId);
  }
}

export default new Notifications();