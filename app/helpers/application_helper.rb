module ApplicationHelper

  def smartphone
    user_agent = request.headers[:HTTP_USER_AGENT]
    os_list = ["Windows Phone", "iPhone", "Android"]
    os_list.each do |os|
      return os if user_agent.match(os)
    end
    nil
  end

  def date(time, sep = "-")
      time.to_s.split(" ")[0].split("-").join(sep)
  end

end
