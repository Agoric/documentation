"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, MessageCircle, TrendingUp, Star, Award, BookOpen, Lightbulb, Share, ThumbsUp } from "lucide-react"

export default function CommunityPage() {
  const communityStats = {
    totalMembers: 12450,
    activeToday: 1247,
    totalPosts: 8934,
    helpfulAnswers: 3421,
  }

  const topContributors = [
    { name: "Sarah Chen", avatar: "/avatars/sarah.jpg", points: 2450, badge: "Expert" },
    { name: "Mike Rodriguez", avatar: "/avatars/mike.jpg", points: 1890, badge: "Mentor" },
    { name: "Emily Johnson", avatar: "/avatars/emily.jpg", points: 1654, badge: "Helper" },
    { name: "David Kim", avatar: "/avatars/david.jpg", points: 1432, badge: "Contributor" },
  ]

  const recentPosts = [
    {
      id: 1,
      title: "Best strategies for RWA token diversification?",
      author: "Alex Thompson",
      replies: 12,
      likes: 24,
      category: "Investment",
      timeAgo: "2 hours ago",
    },
    {
      id: 2,
      title: "How to optimize credit score with quantum insights?",
      author: "Maria Garcia",
      replies: 8,
      likes: 18,
      category: "Credit",
      timeAgo: "4 hours ago",
    },
    {
      id: 3,
      title: "International lending experience with Philippine banks",
      author: "John Lee",
      replies: 15,
      likes: 31,
      category: "Lending",
      timeAgo: "6 hours ago",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Snapifi Community</h1>
          <p className="text-muted-foreground">
            Connect with fellow users, share insights, and learn from financial experts
          </p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">
          <Users className="h-3 w-3 mr-1" />
          {communityStats.totalMembers.toLocaleString()} Members
        </Badge>
      </div>

      <Tabs defaultValue="feed" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feed">Community Feed</TabsTrigger>
          <TabsTrigger value="experts">Expert Network</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6">
          {/* Community Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{communityStats.totalMembers.toLocaleString()}</div>
                <p className="text-xs text-green-600">+12% this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Today</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{communityStats.activeToday.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">online now</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{communityStats.totalPosts.toLocaleString()}</div>
                <p className="text-xs text-green-600">+8% this week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Helpful Answers</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{communityStats.helpfulAnswers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">community solutions</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Discussions</CardTitle>
              <CardDescription>Latest posts from the community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{post.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>by {post.author}</span>
                          <Badge variant="outline">{post.category}</Badge>
                          <span>{post.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{post.replies}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="text-sm">{post.likes}</span>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Share className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Contributors */}
          <Card>
            <CardHeader>
              <CardTitle>Top Contributors</CardTitle>
              <CardDescription>Community members making a difference</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={contributor.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {contributor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{contributor.name}</h4>
                        <Badge className="bg-purple-100 text-purple-800">{contributor.badge}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{contributor.points.toLocaleString()}</div>
                      <p className="text-sm text-muted-foreground">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Expert Network</span>
              </CardTitle>
              <CardDescription>Connect with verified financial experts and advisors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Award className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Expert Advisory Network</h3>
                <p className="text-muted-foreground mb-4">
                  Get personalized advice from certified financial professionals
                </p>
                <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                  <Users className="h-4 w-4 mr-2" />
                  Browse Experts
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5" />
                <span>Community Events</span>
              </CardTitle>
              <CardDescription>Webinars, workshops, and networking events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Lightbulb className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Upcoming Events</h3>
                <p className="text-muted-foreground mb-4">Join educational webinars and networking sessions</p>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  View Events
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Community Resources</span>
              </CardTitle>
              <CardDescription>Guides, templates, and educational materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Resource Library</h3>
                <p className="text-muted-foreground mb-4">Access community-created guides and educational content</p>
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Resources
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
