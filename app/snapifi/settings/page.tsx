"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, User, Shield, Bell, Palette, Globe, CreditCard, Smartphone, Lock, Eye, EyeOff } from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    dataSharing: false,
    analytics: true,
    thirdParty: false,
  })

  const [showApiKey, setShowApiKey] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Platform Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and platform configuration</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">
          <Settings className="h-3 w-3 mr-1" />
          Quantum Secured
        </Badge>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription>Update your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
              <CardDescription>Manage your account security and authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Biometric Login</h4>
                    <p className="text-sm text-muted-foreground">Use fingerprint or face recognition</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Session Timeout</h4>
                    <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                  </div>
                  <select className="p-2 border rounded">
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>Never</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>API Key</Label>
                <div className="flex space-x-2">
                  <Input
                    type={showApiKey ? "text" : "password"}
                    value="sk_live_1234567890abcdef"
                    readOnly
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon" onClick={() => setShowApiKey(!showApiKey)}>
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline">Regenerate</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">Browser and mobile push notifications</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-muted-foreground">Important alerts via text message</p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Marketing Communications</h4>
                    <p className="text-sm text-muted-foreground">Product updates and promotional content</p>
                  </div>
                  <Switch
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, marketing: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Privacy Controls</span>
              </CardTitle>
              <CardDescription>Manage your data privacy and sharing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Profile Visibility</h4>
                    <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                  </div>
                  <Switch
                    checked={privacy.profileVisible}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, profileVisible: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Data Sharing</h4>
                    <p className="text-sm text-muted-foreground">Share anonymized data for platform improvement</p>
                  </div>
                  <Switch
                    checked={privacy.dataSharing}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, dataSharing: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Analytics Tracking</h4>
                    <p className="text-sm text-muted-foreground">Help us improve with usage analytics</p>
                  </div>
                  <Switch
                    checked={privacy.analytics}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, analytics: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Third-Party Integrations</h4>
                    <p className="text-sm text-muted-foreground">Allow third-party services to access your data</p>
                  </div>
                  <Switch
                    checked={privacy.thirdParty}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, thirdParty: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5" />
                <span>Platform Integrations</span>
              </CardTitle>
              <CardDescription>Connect external services and applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Plaid Banking</h4>
                      <p className="text-sm text-muted-foreground">Connect your bank accounts</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-6 w-6 text-purple-600" />
                    <div>
                      <h4 className="font-medium">Zillow API</h4>
                      <p className="text-sm text-muted-foreground">Real estate data integration</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-6 w-6 text-orange-600" />
                    <div>
                      <h4 className="font-medium">Credit Monitoring</h4>
                      <p className="text-sm text-muted-foreground">Real-time credit score tracking</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Platform Preferences</span>
              </CardTitle>
              <CardDescription>Customize your platform experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <select className="w-full p-2 border rounded">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <select className="w-full p-2 border rounded">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Currency</Label>
                  <select className="w-full p-2 border rounded">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                    <option>JPY (¥)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Time Zone</Label>
                  <select className="w-full p-2 border rounded">
                    <option>UTC-8 (Pacific)</option>
                    <option>UTC-5 (Eastern)</option>
                    <option>UTC+0 (GMT)</option>
                    <option>UTC+8 (Asia/Manila)</option>
                  </select>
                </div>
              </div>

              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
