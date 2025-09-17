package backend.controllers;



import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaForwardController {

    // Forward top-level paths w/o a dot (no file extension) and not starting with /api
    @RequestMapping("/{path:[^\\.]*}")
    public String forward() {
        return "forward:/index.html";
    }
}
